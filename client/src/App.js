import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/home' element={<Home />} />
            <Route path='/recipes' element={<RecipeCreate />} />
            <Route exact path='/detail/:id' element={<Detail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
