import React from 'react';
import './UserInformation.scss';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/Store';
import { exportData, updateUserPhoto } from '@redux/features/UsersSlice';

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

  const handleExport = () => {
    dispatch(exportData({ id: thisUser.id }));
  };

  return (
    <div className="user-information">
      <div className="user-information__image-wrapper">
        <img className="user-information__image" src={thisUser.imageUrl} alt="" />
        <div className="user-information__file-input-container">
          <input
            type="file"
            id="file-input"
            className="user-information__file-input"
            onChange={changePhoto}
            disabled={loading}
          />
          <label
            htmlFor="file-input"
            className={`user-information__file-input-label ${loading ? 'user-information__file-input-label--disabled' : ''}`}
          >
            {loading ? 'Loading...' : 'Change Photo'}
          </label>
        </div>
        <button className="user-information__export-btn" onClick={handleExport}>
          Download info
        </button>
      </div>
      <div className="user-information__info-wrapper">
        <p className="user-information__info-title">Your information</p>
        <p>ID: {thisUser.id}</p>
        <p>Name: {thisUser.name}</p>
        <p>Email: {thisUser.email}</p>
        <p>Role: {thisUser.role}</p>
      </div>
    </div>
  );
};

export default UserInformation;
