import Button from '@/common/components/button/Button';
import { Divider, Input, List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/apikey.module.scss';
import ApiKeyForm from './ApiKeyForm';

const ApiKeyView = () => {
  const [userApiKey, setUserApiKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //fetch user's api key
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    //delete existing api key
    setUserApiKey('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userApiKey);
    toast.success('Copied API key to clipboard.');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <ToastContainer />
        <h1>API Key Management</h1>
        <Typography.Text>
          An API key is a token that can be used to authenticate certain
          operations, such as ticket purchase. An API key is tied to your
          account. Any API keys that you create will be displayed on this page.{' '}
          <p />
          <b>
            It is important to keep it secure and private in order to prevent
            unauthorized access
          </b>
          . If you suspect your API key has been stolen, you can generate a new
          one. By doing so, any previous API keys will immediately become
          invalid.
        </Typography.Text>
        <Button
          type="primary"
          style={{ width: 'fit-content', marginTop: '1rem' }}
          text="Create now"
          action={showModal}
        ></Button>

        <div style={{ margin: '0 auto !important' }}></div>
        <ApiKeyForm
          open={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
        {userApiKey !== '' && (
          <>
            <Divider />
            <h3>Existing API key</h3>
            <List
              className="frostedGlass"
              style={{
                width: 'fit-content',
                padding: '1rem 2rem',
                borderRadius: '1rem',
                border: 'none',
              }}
            >
              <List.Item
                className={styles.listItem}
                actions={[
                  <a key="copy" onClick={handleCopy}>
                    Copy
                  </a>,
                  <a
                    key="delete"
                    className={styles.deleteLink}
                    onClick={handleDelete}
                  >
                    Delete
                  </a>,
                ]}
              >
                <Input.Password
                  bordered={false}
                  style={{ width: 'fit-content' }}
                  value="9ee1325d-3024-4b56-a86f-e154238a2f72" //fetched api key
                  readOnly
                ></Input.Password>
                <div className={styles.expiry}>Valid until July 28, 2023</div>
              </List.Item>
            </List>
          </>
        )}
      </div>
    </>
  );
};

export default ApiKeyView;
