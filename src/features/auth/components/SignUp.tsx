import Button from '@/common/components/button/Button';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { toast, ToastContainer } from 'react-toastify';

import Link from 'next/link';

import getThemePreference from '@/common/utils/getThemePreference';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../services/auth.service';
import styles from '../styles/auth.module.scss';
import RegisterDto from '../types/RegisterDto';

const SignUp = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const onFinish = (values: RegisterDto) => {
    console.log('Success:', values);
    register({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
    })
      .then((res) => router.push('/example'))
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0], {
        theme: getThemePreference(),
      });
    });
  };
  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1 className={styles.title}>Welcome!</h1>
        <Form
          form={form}
          className={styles.loginForm}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            hasFeedback
            name="first_name"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="last_name"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input
              className={styles.inputField}
              prefix={<UserOutlined />}
              placeholder="Last name"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
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
            hasFeedback
            name="password1"
            rules={[
              { required: true, message: 'Password is required.' },
              {
                min: 8,
                message:
                  'Password is too short. It must be at least 8 characters.',
              },
            ]}
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
            name="password2"
            hasFeedback
            dependencies={['password1']}
            rules={[
              { required: true, message: 'Password is required.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password1') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match.'));
                },
              }),
            ]}
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
