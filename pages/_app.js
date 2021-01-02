// This `pages/_app.js` file is useful to use styles.scss globally.

import { CookiesProvider } from 'react-cookie';
import '../styles.scss';

export default function App({ Component, pageProps }) {
  return (
    // Givin access to the Cookie
    <CookiesProvider>
        <Component {...pageProps} />
    </CookiesProvider>
  )
};