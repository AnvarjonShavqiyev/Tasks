import { Link, useParams } from 'react-router-dom';
import './Auth.scss';
import SignIn from './signin/Signin';
import SignUp from './signup/Signup';
import React from 'react';

const Auth: React.FC = () => {
  const { authName } = useParams();
  return (
    <div className="auth">
      <div className="auth__form-wrapper">
        <div className="auth__header">
          <Link
            to="/signIn"
            className={
              authName === 'signIn'
                ? 'auth__action-title auth__action-title--active'
                : 'auth__action-title'
            }
          >
            Sign In
          </Link>
          <Link
            to="/signUp"
            className={
              authName === 'signUp'
                ? 'auth__action-title auth__action-title--active'
                : 'auth__action-title'
            }
          >
            Create account
          </Link>
        </div>
        {authName === 'signIn' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Auth;