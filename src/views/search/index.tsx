import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@vtex/store-sdk'
import type { FC } from 'react'
import type { Props as PageProps } from 'src/pages/s/[...]'
import { Skeleton } from '@vtex/store-ui'

import Seo from './Seo'
import { useSearch } from './hooks/useSearch'

import 'src/styles/skeleton.css'

interface Props extends PageProps {
  searchParams: SearchParamsState
}

const View: FC<Props> = (props) => {
  const { searchParams, data: serverData } = props
  const { data: dynamicData } = useSearch(searchParams)

  const data = { ...dynamicData, ...serverData }
  const { site, search } = data
  const title = site?.siteMetadata?.title ?? ''

  return (
    <div className="py-8 w-11/12 m-auto">
      {search == null || site == null ? (
        <Skeleton />
      ) : (
        <SearchProvider
          searchParams={searchParams}
          pageInfo={{
            size: ITEMS_PER_PAGE,
            total: Math.ceil(
              search.products.pageInfo.totalCount / ITEMS_PER_PAGE
            ),
          }}
        >
          <Seo title={title} site={site} />

          {/* UI components */}
          <ProductGallery
            fallbackData={dynamicData}
            products={search.products}
            facets={search.facets}
          />
        </SearchProvider>
      )}
    </div>
  )
}

export default View
