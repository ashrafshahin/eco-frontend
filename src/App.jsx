import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import router from './routes/AppRoutes'
import { RouterProvider } from 'react-router'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />

    </CartProvider>
    
  )
};

export default App
