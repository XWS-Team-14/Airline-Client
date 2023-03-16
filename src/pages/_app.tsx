import ThemePreference from '@/common/types/ThemePreference';
import getThemePreference from '@/common/utils/getThemePreference';
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
          const preference = event.matches ? 'dark' : 'light';
          setPreference(preference);
        });
    }
    const preference = getThemePreference();
    setPreference(preference);
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
