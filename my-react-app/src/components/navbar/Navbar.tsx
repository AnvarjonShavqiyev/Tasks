import { Container } from '../../utils/Utils'
import './Navbar.scss'
const Navbar = () => {
  return (
    <div className='navbar__wrapper'>
        <Container>
          <h2 className='navbar-title'>User management</h2>
        </Container>
    </div>
  )
}

export default Navbar