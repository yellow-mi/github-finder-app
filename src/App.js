import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
