import { Card } from '@mui/material'
import React from 'react'
import CartSummary from "./cart-summary/cart-summary";

const CartSidebar = () => {
  return (
    <Card sx={{
      p: 3
    }}>
      <CartSummary />
    </Card>
  )
}

export default CartSidebar