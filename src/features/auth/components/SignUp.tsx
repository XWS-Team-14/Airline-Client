import Button from '@/common/components/button/Button';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import Link from 'next/link';

import { useState } from 'react';
import styles from '../styles/auth.module.scss';

const SignUp = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome!</h1>
        <Form
          form={form}
          className={styles.loginForm}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="first-name"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            name="last-name"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="Last name"
            />
          </Form.Item>
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
          <Form.Item
            name="password-confirm"
            rules={[{ required: true, message: 'Password is required.' }]}
          >
            <Input.Password
              className={styles.inputField}
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item className={styles.submit}>
            <Button type="primary" text="Sign up" style={{ width: '100%' }} />
            <p>
              Already have an account?{' '}
              <b>
                <Link href="/login">Log in here!</Link>
              </b>
            </p>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default SignUp;
