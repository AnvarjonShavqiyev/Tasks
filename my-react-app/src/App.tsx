import './App.css';
import Navbar from './components/navbar/Navbar';
import UserTable from './components/users-table/UserTable';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <UserTable/>
    </div>
  );
}

export default App;
