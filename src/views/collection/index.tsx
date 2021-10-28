import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import { ITEMS_PER_PAGE } from 'src/constants'
import { SearchProvider } from 'src/sdk/search/Provider'
import type { SearchParamsState } from '@vtex/store-sdk'
import { Skeleton } from '@vtex/store-ui'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}/[...]'

import { useCollection } from './hooks/useCollection'
import Seo from './Seo'

import 'src/styles/skeleton.css'

interface Props extends PageProps {
  searchParams: SearchParamsState
}

function View(props: Props) {
  const {
    pageContext: { slug },
    data: staticData,
    searchParams,
  } = props

  const { data: dynamicData } = useCollection(searchParams)

  const data = { ...dynamicData, ...staticData }
  const { storeCollection, site, search } = data

  const title =
    staticData.storeCollection?.seo.title ??
    staticData.site?.siteMetadata?.title ??
    ''

  return (
    <>
      <h1 className="absolute top-[-100px]">{title}</h1>
      <div className="py-8 w-11/12 m-auto">
        {search == null || site == null || storeCollection == null ? (
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
            {/* TODO: Move seo components to SSG */}
            <Seo
              title={title}
              slug={slug}
              site={site}
              storeCollection={storeCollection}
            />

            {/* UI components */}
            <ProductGallery
              fallbackData={dynamicData}
              products={search.products}
              facets={search.facets}
            />
          </SearchProvider>
        )}
      </div>
    </>
  )
}

export default View
