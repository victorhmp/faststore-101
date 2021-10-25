import React from 'react'
import CartToggle from 'src/components/cart/CartToggle'

import Navlinks from './Navlinks'
import TopAnnouncement from './Announcement'
import SearchBar from './SearchBar'

function Header() {
  return (
    <header>
      <TopAnnouncement message="Selected items on sale! Check them out!" />
      <div className="flex justify-between bg-primary-400">
        <Navlinks />
        <div className="flex items-center">
          <SearchBar />
          <CartToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
