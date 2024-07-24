import { Container } from '@utils/Utils';
import { User } from '../../types';
import './ProfileNav.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store/Store';
import { logOut } from '@redux/features/AuthSlice';

const ProfileNav = ({ thisUser }: { thisUser: User }) => {
  const dispatch = useDispatch<AppDispatch>();
  const onLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="profile-nav">
      <Container>
        <div className="profile-nav__info">
          <p className="profile-nav__name">{thisUser.name}'s profile</p>
          <button className="profile-nav__btn" onClick={() => onLogOut()}>
            Log Out
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ProfileNav;
