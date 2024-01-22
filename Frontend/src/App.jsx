import AppRoutes from './routes'
import './app.css'
import { ProductProvider } from './context/productsProvider'
function App() {
  return (
    <ProductProvider>
      <AppRoutes />
    </ProductProvider>
  )
}

export default App
