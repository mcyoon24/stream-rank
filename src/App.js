// import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import RankingPage from './components/RankingPage';

function App() {
  return (
    <div>
      <h1>IMDb Ratings for Netflix</h1>
      <Outlet />  
    </div>
  );
}

export default App;
