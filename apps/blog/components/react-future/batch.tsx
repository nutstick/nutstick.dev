import React from 'react';
import {
  Sandpack,
  SandpackConsole,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import { levelUp } from '@codesandbox/sandpack-themes';

const utils = `export const getRandomEmoji = () => {
  return ["🎅", "🐳", "♻️", "🐲", "🚀"][Math.floor(Math.random() * 5)];
};

export const fetchApi = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  return getRandomEmoji();
};`;

const style = `body {
  margin: 0;
  padding: 0;
  color: #fff;
  font-family: "Concert One", sans-serif; /* Nowe */

  width: 100vw;
  height: 100vh;
  background-color: #348cb2;
}

.App {
  text-align: center;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 4rem;
}`;

const app = `import { useState, useCallback, useRef } from "react";
import { getRandomEmoji, fetchApi } from "./utils";
import "./styles.css";

const App = () => {
  const [emoji, setEmoji] = useState(getRandomEmoji());
  const [loading, setLoading] = useState(false);
  const renderCount = useRef(0);

  const handleClick = useCallback(async () => {
    setLoading(true);
    const emoji = await fetchApi();
    setEmoji(emoji);
    setLoading(false);
  }, []);

  if (renderCount.current) {
    console.log("re-render " + renderCount.current);
  }
  renderCount.current++;

  return (
    <div className="App">
      <h1>How many time will we<br/>re-render when click the button?</h1>
      <button onClick={handleClick}>Click me</button>
      <h2>
        {emoji} {["🙉", "🙈"][+loading]}
      </h2>
    </div>
  );
};

export default App;`;

export const Quiz: React.FC = () => {
  return (
    <Sandpack
      theme={levelUp}
      template="react"
      files={{
        '/utils.js': utils,
        '/App.js': app,
        '/styles.css': style,
      }}
      options={{ editorHeight: '50vh' }}
    />
  );
};

const legacyRootIndex = `import { render } from "react-dom";
import App from "./App";
const legacyRootElement = document.getElementById("root");
render(<App />, legacyRootElement);`;

const concurentRootIndex = `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`;

export const LegacyRootQuiz: React.FC = () => {
  return (
    <SandpackProvider
      theme={levelUp}
      template="react"
      files={{
        '/utils.js': utils,
        '/index.js': legacyRootIndex,
        '/App.js': app,
        '/styles.css': {
          code: style,
          hidden: true,
        },
      }}
    >
      <SandpackPreview style={{ height: '35vh' }} />
      <SandpackConsole style={{ height: '25vh' }} />
    </SandpackProvider>
  );
};

export const ConcurrentRootQuiz: React.FC = () => {
  return (
    <SandpackProvider
      theme={levelUp}
      template="react"
      files={{
        '/utils.js': utils,
        '/index.js': concurentRootIndex,
        '/App.js': app,
        '/styles.css': {
          code: style,
          hidden: true,
        },
      }}
    >
      <SandpackPreview style={{ height: '35vh' }} />
      <SandpackConsole style={{ height: '25vh' }} />
    </SandpackProvider>
  );
};
