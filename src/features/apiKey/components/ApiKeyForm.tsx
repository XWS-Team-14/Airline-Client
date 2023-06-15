import type { RadioChangeEvent } from 'antd';
import { InputNumber, Modal, Radio } from 'antd';
import { useState } from 'react';
import styles from '../styles/apikey.module.scss';

interface ApiKeyFormProps {
  open: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

const ApiKeyForm = ({ open, handleCancel, handleOk }: ApiKeyFormProps) => {
  const [validity, setValidity] = useState(null);
  const [days, setDays] = useState(null);

  const handleValidityChange = (e: RadioChangeEvent) => {
    setValidity(e.target.value);
    console.log(e.target.value);
  };

  const canGenerate = () =>
    (validity === 'days' && !!days) || validity === 'forever';

  console.log(canGenerate());
  const handleDaysChange = (e: number | null) => {
    setDays(e);
  };
  return (
    <Modal
      title="Create a new API key"
      open={open}
      onOk={handleOk}
      centered
      destroyOnClose
      onCancel={handleCancel}
      okText="Generate API key"
      okButtonProps={{ disabled: !canGenerate() }}
    >
      <div>
        <Radio.Group
          className={styles.form}
          onChange={handleValidityChange}
          defaultValue={null}
        >
          <Radio value={'days'}>
            Valid for{' '}
            <InputNumber onChange={handleDaysChange} size="small"></InputNumber>{' '}
            days
          </Radio>
          <Radio value={'forever'}>Valid forever</Radio>
        </Radio.Group>
      </div>
    </Modal>
  );
};

export default ApiKeyForm;
