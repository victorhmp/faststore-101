import React from 'react'
import { Button } from '@vtex/store-ui'
import { useCart } from 'src/sdk/cart/useCart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

function CartToggle() {
  const btnProps = useCartToggleButton()
  const { totalUniqueItems } = useCart()

  return (
    <Button {...btnProps} className="mx-3">
      cart: {totalUniqueItems}
    </Button>
  )
}

export default CartToggle
