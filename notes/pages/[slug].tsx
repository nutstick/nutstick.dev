import { noteValue } from 'atoms/notes';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import styles from '../styles/Home.module.css';

const toString = (query: string | string[] | undefined) => {
  return (query ?? '').toString();
};

const Slug: NextPage = ({}) => {
  const { slug } = useRouter().query;

  const note = useRecoilValue(noteValue(toString(slug)));

  if (note == null) {
    return (
      <div className={styles.root}>
        <Head>
          <title>Not found</title>
        </Head>
        <main className={styles.main}>Not found</main>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Head>
        <title>{note.title}</title>
        <meta name="description" content={note.excerpt} />
      </Head>
      <main className={styles.main}>{note.content}</main>
    </div>
  );
};

export default Slug;
