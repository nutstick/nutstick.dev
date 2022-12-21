import { google, Auth } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData =
  | {
      error: number;
      message: string;
    }
  | {
      success: boolean;
    };

interface RegisterNextApiRequest extends NextApiRequest {
  body: {
    name?: string;
    code?: string;
    guest?: string;
  };
}

const credentials: Auth.JWTInput = JSON.parse(
  Buffer.from(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ?? '',
    'base64'
  ).toString()
);

async function appendRow(values: string[]) {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
    credentials,
  });
  // Set up the Google Sheets API client
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  const range = 'Invitation List!A:Z';

  // Call the Google Sheets API to append the row
  await sheets.spreadsheets.values.append(
    {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        majorDimension: 'ROWS',
        values: [values],
        range,
      },
    },
    {}
  );
}

async function postHandler(
  req: RegisterNextApiRequest,
  res: NextApiResponse<PostResponseData>
) {
  const guest = Number(req.body.guest || 0);
  if (!req.body.name) {
    return res.status(400).json({ error: 2, message: 'required name' });
  }
  if (!req.body.code) {
    return res.status(400).json({ error: 3, message: 'required code' });
  }
  if (Number.isNaN(guest) || guest > 25 || guest < 0) {
    return res.status(400).json({ error: 4, message: 'invalid guest' });
  }

  try {
    await appendRow([
      new Date().toISOString(),
      req.body.name,
      `${guest}`,
      req.body.code,
    ]);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 1, message: 'internal error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData>
) {
  if (req.method === 'POST') {
    return postHandler(req, res);
  }
}
