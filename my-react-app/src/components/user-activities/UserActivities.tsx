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
    dispatch(getUserActivity({ id }));
  }, []);
  return (
    <div className="user-activities__wrapper">
      <h4>Your activities</h4>
        <div className="all-activities">
          {activities.map((activity: UserActivity, index: number) => {
            return (
              <div key={index} className="activity">
                <p className="activity-info">{activity.time}</p>
                <p className="activity-info">{activity.activityType}</p>
                <p className="activity-info">{activity.description}</p>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default UserActivities;
