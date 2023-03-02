import Button from '@/common/components/button/Button';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import Link from 'next/link';

import { useState } from 'react';
import styles from './Login.module.scss';

const Login = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome back!</h1>
        <Form className={styles.loginForm}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email is required.' },
              {
                type: 'email',
                message: 'Email is not valid.',
              },
            ]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required.' }]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Log in" style={{ width: '100%' }} />
            <p>
              Don`t have an account?{' '}
              <b>
                <Link href="/signup">Sign up here!</Link>
              </b>
            </p>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
