import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import classNames from 'classnames';
import { ReactNode } from 'react';
import NavigationBar from '../navigationBar/NavigationBar';
import styles from './BaseTemplate.module.scss';

interface BaseTemplateProps {
  children?: ReactNode;
}

const BaseTemplate = ({ children }: BaseTemplateProps) => (
  <Layout className={classNames(styles.layout)}>
    <Layout className={styles.contentLayout}>
      <Header
        className={styles.header}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100vw',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '4rem',
        }}
      >
        <NavigationBar />
      </Header>
      <Content>{children}</Content>
    </Layout>
  </Layout>
);

export default BaseTemplate;
