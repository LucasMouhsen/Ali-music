import AppRoutes from './routes'
import './app.css'
import { ProductProvider } from './context/productsProvider'
import { CategoriesProvider } from './context/categoriesProvider'
import { ModalProvider } from './context/ModalProvider'
import { CartProvider } from './context/cartProvider'
function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <ProductProvider>
          <CategoriesProvider>
            <AppRoutes />
          </CategoriesProvider>
        </ProductProvider>
      </CartProvider>
    </ModalProvider>
  )
}

export default App
