import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header/Header'
import Navbar from './component/Navbar/Navbar'

function App() {
  
  return (
    <div className="grid-container">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
