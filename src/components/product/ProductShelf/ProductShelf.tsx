import React, { useMemo } from 'react'
import { useSlider, Bullets, IconButton } from '@vtex/store-ui'
import { useSearchQuery } from 'src/sdk/search/useSearchQuery'
import type { SearchQueryQueryVariables } from '@generated/graphql'

import 'src/styles/bullets.css'

import ProductSummary from '../ProductSummary'
import { LeftArrowIcon, RightArrowIcon } from './Arrows'

interface Props {
  searchParams: SearchQueryQueryVariables
  itemsPerPage: number
}

const createTransformValues = (totalItems: number) => {
  if (!totalItems) {
    return {}
  }

  const transformMap: Record<number, number> = {}
  const slideWidth = 100 / totalItems

  for (let idx = 0; idx < totalItems; ++idx) {
    const transformValue = -(slideWidth * idx)

    transformMap[idx] = transformValue
  }

  return transformMap
}

function ProductShelf({ searchParams, itemsPerPage }: Props) {
  const products = useSearchQuery(searchParams)
  const productCount = products?.edges.length ?? searchParams.first

  const transformValues = useMemo(
    () => createTransformValues(productCount),
    [productCount]
  )

  const { handlers, slide, sliderState, sliderDispatch } = useSlider({
    totalItems: productCount,
    itemsPerPage,
    infiniteMode: false,
  })

  const slidingTransition = `transform 400ms`

  if (!products || !productCount) {
    return null
  }

  return (
    <section>
      <div style={{ overflow: 'hidden', width: '100%' }} {...handlers}>
        <div
          data-carousel-track
          style={{
            display: 'flex',
            transition: sliderState.sliding ? slidingTransition : undefined,
            width: `${(productCount * 100) / itemsPerPage}%`,
            transform: `translate3d(${
              transformValues[sliderState.currentPage * itemsPerPage]
            }%, 0, 0)`,
          }}
          onTransitionEnd={() => {
            sliderDispatch({
              type: 'STOP_SLIDE',
            })

            if (sliderState.currentItem >= productCount) {
              sliderDispatch({
                type: 'GO_TO_PAGE',
                payload: {
                  pageIndex: 0,
                  shouldSlide: false,
                },
              })
            }

            if (sliderState.currentItem < 0) {
              sliderDispatch({
                type: 'GO_TO_PAGE',
                payload: {
                  pageIndex: sliderState.totalPages - 1,
                  shouldSlide: false,
                },
              })
            }
          }}
        >
          {products.edges.map((product, idx) => (
            <div key={idx} style={{ width: `${100 / productCount}%` }}>
              <div className="flex justify-center items-center w-full">
                <ProductSummary product={product.node} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <IconButton
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('previous', sliderDispatch)
        }}
        icon={<LeftArrowIcon />}
      />
      <IconButton
        onClick={() => {
          if (sliderState.sliding) {
            return
          }

          slide('next', sliderDispatch)
        }}
        icon={<RightArrowIcon />}
      />

      <Bullets
        totalQuantity={Math.ceil(productCount / itemsPerPage)}
        activeBullet={sliderState.currentPage}
        onClick={(_, idx) => {
          if (sliderState.sliding) {
            return
          }

          slide(idx, sliderDispatch)
        }}
      />
    </section>
  )
}

export default ProductShelf
