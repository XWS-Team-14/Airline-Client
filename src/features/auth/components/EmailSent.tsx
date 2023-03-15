import { Form } from 'antd';

import { useState } from 'react';
import styles from '../styles/auth.module.scss';

const EmailSent = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <section className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Thanks for registering!</h1>
        <div className={styles.paragraph}>
          <p>
            In order to complete your registration and be able to log in, please
            check the email you entered.
          </p>
          <p>
            It can take up to a few minutes for the email to be delivered, and
            make sure to check your <i>Spam</i> or <i>Junk</i> folder as well.
          </p>
          <p>
            If the email entered is wrong or you can&#39;t find the email, you
            can request to resend the verification email here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSent;
