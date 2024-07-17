import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/Store'
import { getById } from '../../redux/features/UsersSlice'
import './Profile.scss'
import ProfileNav from '../../components/profileNav/ProfileNav'
import UserInformation from '../../components/userInformation/UserInformation'

const Profile:React.FC = () => {
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>() 
  const thisUser = useSelector((state:RootState) => state.users.thisUser)
  useEffect(()=> {
    dispatch(getById({ id }))
  },[])
  return (
    <div className='profile-wrapper'>
        <ProfileNav thisUser={thisUser}/>
        <Container>
            <UserInformation thisUser={thisUser}/>
        </Container>
    </div>
  )
}

export default Profile
