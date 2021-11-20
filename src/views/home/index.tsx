import React from 'react'
import { Carousel, Button } from '@vtex/store-ui'
import type { Props as PageProps } from 'src/pages/index'
import Shelf from 'src/components/product/ProductShelf/ProductShelf'
import 'src/styles/carousel.css'

import Seo from './Seo'

export type Props = PageProps

function View(props: Props) {
  const title = props.data.site?.siteMetadata?.title ?? ''

  return (
    <>
      <Seo {...props} title={title} />
      <main>
        <Carousel
          controls="complete"
          transition={{
            duration: 400,
            property: 'transform',
          }}
        >
          <img
            alt=""
            height={614}
            src="https://storecomponents.vtex.app/assets/fit-in/1280x613/center/middle/https%3A%2F%2Fstorecomponents.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F331632a0-fa52-4f08-8e45-df762d97a289___167e4c8385c3129b1a2ddab9156510ba.jpg"
            width="100%"
          />
          <img
            alt=""
            height={614}
            src="https://storecomponents.vtex.app/assets/fit-in/1280x613/center/middle/https%3A%2F%2Fstorecomponents.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fedce348c-068c-4fb9-91f2-7d235d596e0f___b2822f893b14f87337d08f07f0e520ab.jpg"
            width="100%"
          />
        </Carousel>

        <section className="my-3 w-full">
          <h2 className="text-xl text-center">Product Shelf</h2>
          <Shelf
            searchParams={{
              first: 9,
              after: '0',
              term: '',
              sort: 'score_desc' as const,
              selectedFacets: [{ key: 'c', value: 'women' }],
            }}
            itemsPerPage={3}
          />
        </section>

        <section
          className="w-full flex-wrap flex"
          style={{ margin: '64px 0', maxHeight: 540 }}
        >
          <div
            className="flex flex-col justify-center items-center"
            style={{ width: '30%' }}
          >
            <h2>New Promotion!</h2>
            <Button>Buy now</Button>
          </div>
          <div>
            <img
              alt=""
              width={840}
              height={300}
              src="https://storecomponents.vtexassets.com/assets/faststore/images/banner-infocard2___3f284742ba9ede3826bc0721f0789694.png?height=300&aspect=true"
            />
          </div>
          <div />
        </section>
      </main>
    </>
  )
}

export default View
