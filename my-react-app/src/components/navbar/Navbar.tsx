import { useDispatch } from 'react-redux'
import { Container } from '../../utils/Utils'
import './Navbar.scss'
import { AppDispatch } from '../../redux/store/Store'
import { logOut } from '../../redux/features/AuthSlice'
const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const doLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className='navbar__wrapper'>
        <Container>
          <div className='navbar'>
            <h2>User managemant</h2>
            <button className='logout-btn' onClick={doLogOut}>Log Out</button>
          </div>
        </Container>
    </div>
  )
}

export default Navbar