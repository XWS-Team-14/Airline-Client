import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '../common/styles/globals.scss';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <main className={inter.className}>
        <ToastContainer />
        <Component {...pageProps} />
      </main>
    </ConfigProvider>
  );
}
