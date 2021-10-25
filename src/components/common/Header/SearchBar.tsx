import React from 'react'
import { SearchInput } from '@vtex/store-ui'
import { navigate } from 'gatsby-link'

import 'src/styles/search-input.css'

function SearchBar() {
  return (
    <SearchInput
      onSubmit={(term) => navigate(`/s/${term}?map=term`)}
      placeholder="Search"
    />
  )
}

export default SearchBar
