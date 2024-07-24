import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@utils/Utils';
import { AppDispatch, RootState } from '@redux/store/Store';
import { logOut } from '@redux/features/AuthSlice';
import './Navbar.scss';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { searchUser } from '@redux/features/UsersSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>('');
  const user = useSelector((state: RootState) => state.auth.user);
  const onLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    dispatch(searchUser({ search }));
  }, [search]);

  return (
    <div className="navbar">
      <Container>
        <div className="navbar__content">
          <div className="navbar__user-info">
            <Avatar className="navbar__user-avatar">
              {user?.name[0].toUpperCase()}
            </Avatar>
            <div className="navbar__user-profile">
              <h4 className="navbar__user-name">{user?.name}</h4>
              <Link className="navbar__profile-link" to={`/profile/${user?.id}`}>
                Account
              </Link>
            </div>
          </div>
          <div className="navbar__search-wrapper">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="navbar__search-input"
              type="text"
              placeholder="Search with name or email"
            />
            <SearchOutlined className="navbar__search-icon" />
          </div>
          <button className="navbar__logout-btn" onClick={onLogOut}>
            Log Out
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
