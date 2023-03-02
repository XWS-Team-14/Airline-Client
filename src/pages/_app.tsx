import ThemePreference from '@/common/types/ThemePreference';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import '../common/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [preference, setPreference] = useState<ThemePreference>();

  useEffect(() => {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          setPreference(event.matches ? 'dark' : 'light');
        });
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setPreference('dark');
    } else {
      setPreference('light');
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          preference === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
