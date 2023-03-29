import Button from '@/common/components/button/Button';
import {
  setAuthState,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
} from '@/common/store/slices/authSlice';
import api from '@/common/utils/axiosInstance';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUserData, login } from '../services/auth.service';
import styles from '../styles/auth.module.scss';
import LoginDto from '../types/LoginDto';

const Login = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = (values: LoginDto) => {
    login({
      email: values.email,
      password: values.password,
    })
      .then(async (res) => {
        api.defaults.headers.common.Authorization =
          'Bearer ' + res.data.access_token;
        dispatch(setAuthState(true));
        const user = await getCurrentUserData();
        if (user) {
          dispatch(setUserFirstName(user.firstName));
          dispatch(setUserLastName(user.lastName));
          dispatch(setUserEmail(user.email));
          router.replace('/');
        }
      })
      .catch((err) => {
        err.response.data.non_field_errors.map((error: string) => {
          toast.error(error);
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorInfo.errorFields.map((error: any) => {
      toast.error(error.errors[0]);
    });
  };

  return (
    <section className={styles.pageWrapper}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Welcome back!</h1>
        <Form
          form={form}
          className={styles.loginForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
              Don&apos;t have an account?{' '}
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
