import React, { useEffect, useState } from 'react';
import { Form, Popconfirm, Table, Typography, Button, TableProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/Store';
import {
  deleteUser,
  getAllUsers,
  getLimitedUsers,
  updateUser,
} from '@redux/features/UsersSlice';
import { Container } from '@utils/Utils';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { EditableCell } from '@components/editableCell/EditableCell';
import './UserTable.scss';
import { Link } from 'react-router-dom';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  role: string;
}

const UserTable: React.FC = () => {
  const [form] = Form.useForm();
  const users =
    useSelector((state: RootState) => state.users.paginatedUsers?.users) || [];
  const total = useSelector((state: RootState) => state.users.paginatedUsers?.total);
  const [data, setData] = useState<User[]>(users);
  const [editingKey, setEditingKey] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const isEditing = (record: User) => record.id === editingKey;
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setData(users || []);
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

  const deleteUsers = async (id: string) => {
    try {
      await dispatch(deleteUser({ id }));
      setData(data.filter((user: User) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      editable: true,
      render: (text: string, record: User) => {
        if (!record) return null;
        return (
          <Link style={{ color: '#000' }} to={`/profile/${record.id}`}>
            <img width={40} height={40} src={record.imageUrl} />
          </Link>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      render: (text: string, record: User) => {
        if (!record) return null;
        return (
          <Link style={{ color: '#000' }} to={`/profile/${record.id}`}>
            {record.name}
          </Link>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '40%',
      editable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '15%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: '50%',
      render: (text: string, record: User) => {
        if (!record) return null;
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : userRole === 'admin' ? (
          <div className="actions__wrapper">
            <Button
              danger
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              <EditFilled />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteUsers(record.id)}
            >
              <DeleteFilled />
            </Button>
          </div>
        ) : (
          <div>
            <p>You are not admin</p>
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

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    dispatch(getLimitedUsers({ page: current, limit: pageSize }));
  };

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
          pagination={false}
        />
      </Form>
      <Pagination
        showSizeChanger
        onChange={onShowSizeChange}
        defaultCurrent={1}
        total={total}
        className="table-pagination"
      />
    </Container>
  );
};

export default UserTable;
