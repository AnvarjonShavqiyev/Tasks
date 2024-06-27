
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { User } from '../../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/Store';
import { createUser } from '../../../redux/features/AuthSlice';

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>()
  const onFinish = (value: User) => {
    const { name, email, password } = value;
    const newUser = { name, email, password };
    dispatch(createUser({newUser}))
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"40px", width:"100%"}}>
      <Form
        name="registration"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="retypePassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please retype your Password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Retype Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
