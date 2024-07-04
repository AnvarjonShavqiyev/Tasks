import { useDispatch } from 'react-redux'
import { Container } from '../../utils/Utils'
import { AppDispatch } from '../../redux/store/Store'
import { logOut } from '../../redux/features/AuthSlice'
import './Navbar.scss'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const onLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className='navbar__wrapper'>
        <Container>
          <div className='navbar'>
            <h2>User management</h2>
            <button className='logout-btn' onClick={onLogOut}>Log Out</button>
          </div>
        </Container>
    </div>
  )
}

export default Navbar
