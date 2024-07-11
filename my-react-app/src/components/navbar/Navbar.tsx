import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../utils/Utils'
import { AppDispatch, RootState } from '../../redux/store/Store'
import { logOut } from '../../redux/features/AuthSlice'
import './Navbar.scss'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { searchUser } from '../../redux/features/UsersSlice'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [search, setSearch] = useState<string>('')
  const user = useSelector((state:RootState) => state.auth.user)
  const onLogOut = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(searchUser({search}))  
  },[search])

  return (
    <div className='navbar__wrapper'>
        <Container>
          <div className='navbar'>
            <div className='user-info'>
              <Avatar className='user-avatar'>{user?.name[0].toUpperCase()}</Avatar>   
              <div className='user-profile'>
                <h4 className='user-name'>{user?.name}</h4>
                <Link className='profile-link' to='/profile'>Account</Link>
              </div>
            </div>
            <div className='search-wrapper'>
              <input value={search} onChange={(e) => setSearch(e.target.value)} className='search-input' type="text" placeholder='Search with name or email'/>
              <SearchOutlined className='search-icon'/>
            </div>
            <button className='logout-btn' onClick={onLogOut}>Log Out</button>
          </div>
        </Container>
    </div>
  )
}

export default Navbar
