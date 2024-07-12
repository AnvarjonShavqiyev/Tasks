import React from 'react';
import './UserInformation.scss';
import { User } from '../../types';
interface UserInformationProps {
  thisUser: User;
}

const UserInformation: React.FC<UserInformationProps> = ({ thisUser }) => {
  return (
    <div className='user-information-wrapper'>
      <img src="" alt="" />
      
      <div>
        <p>Your information</p>
        <p>ID: {thisUser.id}</p>
        <p>Name: {thisUser.name}</p>
        <p>Email: {thisUser.email}</p>
      </div>
    </div>
  );
};

export default UserInformation;
