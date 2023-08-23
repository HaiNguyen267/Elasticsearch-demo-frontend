import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Product from './components/Product';
import { TypeAnimation } from 'react-type-animation';
import Homepage from './pages/Homepage';
import ProductDetail from './pages/ProductDetailPage';
function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App;
