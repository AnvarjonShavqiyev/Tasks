import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/Store';
import { getById } from '@redux/features/UsersSlice';
import './Profile.scss';
import ProfileNav from '@components/profileNav/ProfileNav';
import UserInformation from '@components/userInformation/UserInformation';
import UserActivities from '@components/user-activities/UserActivities';

const Profile: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const thisUser = useSelector((state: RootState) => state.users.thisUser);

  useEffect(() => {
    if (id) {
      dispatch(getById({ id }));
    }
  }, [id, dispatch]);

  if (!thisUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileNav thisUser={thisUser} />
      <Container>
        <UserInformation thisUser={thisUser} />
        <UserActivities />
      </Container>

    </div>
  );
};


export default Profile;