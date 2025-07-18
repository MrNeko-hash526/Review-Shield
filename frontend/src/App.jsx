import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import About from './pages/About'
import Services from './pages/Services'
import Analyzer from './Analyzer/Analyzer'

// Page Components
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="analyzer" element={<Analyzer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
