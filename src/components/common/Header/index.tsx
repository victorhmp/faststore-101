import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from './Navlinks'
import TopAnnouncement from './Announcement'

function Header() {
  return (
    <header>
      <TopAnnouncement message="Selected items on sale! Check them out!" />
      <div className="flex justify-between bg-primary-400">
        <Navlinks />
        <CartToggle />
      </div>
    </header>
  )
}

export default Header
