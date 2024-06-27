import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/Store';
import { deleteUser, getAllUsers, updateUser } from '../../redux/features/UsersSlice';
import { Container } from '../../utils/Utils';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import './UserTable.scss';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: User;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserTable: React.FC = () => {
  const [form] = Form.useForm();
  const users = useSelector((state: RootState) => state.users.users);
  const [data, setData] = useState(users);
  const [editingKey, setEditingKey] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const isEditing = (record: User) => record.id === editingKey;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setData(users); // Update local state 'data' when 'users' changes
  }, [users]);

  const edit = (record: Partial<User> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', email: '', password: '', ...record });
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as User;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        dispatch(updateUser({ id: item.id, newData: row }));
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteUsers = async(id: string) => {
    try{
      await dispatch(deleteUser({ id }));
      // Update 'data' state after successful deletion
      setData(data.filter((user:User) => user.id !== id));
    }catch(error){
      console.log(error)
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '40%',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      width: '15%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_: any, record: User) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="actions__wrapper">
            <Button danger disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditFilled />
            </Button>
            <Button type="primary" danger onClick={() => deleteUsers(record.id)}>
              <DeleteFilled />
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: User) => ({
        record,
        inputType: col.dataIndex === 'password' ? 'text' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Container>
      <Form form={form} component={false}>
        <h2 style={{ margin: '20px' }}>Users Table</h2>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data.map((item) => ({ ...item, key: item.id }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </Container>
  );
};

export default UserTable;
