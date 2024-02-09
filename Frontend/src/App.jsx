import AppRoutes from './routes'
import './app.css'
import { ProductProvider } from './context/productsProvider'
import { CategoriesProvider } from './context/categoriesProvider'
import { ModalProvider } from './context/ModalProvider'
import { CartProvider } from './context/cartProvider'
import { UserProvider } from './context/userProvider'
function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <UserProvider>
          <ProductProvider>
            <CategoriesProvider>
              <AppRoutes />
            </CategoriesProvider>
          </ProductProvider>
        </UserProvider>
      </CartProvider>
    </ModalProvider>
  )
}

export default App
