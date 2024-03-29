import { wrapper } from '@/common/store/store';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import '../common/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });
function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: `${inter.style.fontFamily}`,
          },
        }}
      >
        <main className={inter.className}>
          <Component {...props} />
        </main>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
