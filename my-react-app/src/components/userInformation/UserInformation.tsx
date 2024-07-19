import React from 'react';
import './UserInformation.scss';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/Store';
import { updateUserPhoto } from '@redux/features/UsersSlice';

interface UserInformationProps {
  thisUser: User;
}

const UserInformation: React.FC<UserInformationProps> = ({ thisUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.users.loading);
  const changePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      dispatch(updateUserPhoto({ id: +thisUser.id, file }));
    }
  };
  return (
    <div className="user-information-wrapper">
      <div className="user-image__wrapper">
        <img className="user-image" src={thisUser.imageUrl} alt="" />
        <div className="file-input-container">
          <input
            type="file"
            id="file-input"
            className="file-input"
            onChange={changePhoto}
            disabled={loading}
          />
          <label
            htmlFor="file-input"
            className={`file-input-label ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Loading...' : 'Change Photo'}
          </label>
        </div>
      </div>
      <div className="user-info__wrapper">
        <p className="info-title">Your information</p>
        <p>ID: {thisUser.id}</p>
        <p>Name: {thisUser.name}</p>
        <p>Email: {thisUser.email}</p>
        <p>Role: {thisUser.role}</p>
      </div>
    </div>
  );
};

export default UserInformation;
