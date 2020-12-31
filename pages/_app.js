// This `pages/_app.js` file is useful to use styles.scss globally.

import '../styles.scss';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
};