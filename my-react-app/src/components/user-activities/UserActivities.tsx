import { useEffect } from 'react';
import './UserActivities.scss';
import { getUserActivity } from '@redux/features/UsersSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/Store';
import { UserActivity } from '../../types';

const UserActivities = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector(
    (state: RootState) => state.users.userActivities
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserActivity({ id }));
    }
  }, [id, dispatch]);

  return (
    <div className="user-activities">
      <h4 className="user-activities__title">Your activities</h4>
      <div className="user-activities__list">
        {activities.map((activity: UserActivity, index: number) => (
          <div key={index} className="user-activities__item">
            <p className="user-activities__info">{activity.time}</p>
            <p className="user-activities__info">{activity.activityType}</p>
            <p className="user-activities__info user-activities__info--full">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivities;