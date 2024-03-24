import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import Home from './pages/Home';
import Index from './pages/index';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' 
              element={<Index />}
            />
            <Route path='/api/workouts' 
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
