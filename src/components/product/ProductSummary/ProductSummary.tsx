import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import { Button } from '@vtex/store-ui'
import DiscountBadge from 'src/components/ui/DiscountBadge'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useImage } from 'src/sdk/image/useImage'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

interface Props {
  product: ProductSummary_ProductFragment
}

function ProductSummary({ product }: Props) {
  const {
    id,
    sku,
    gtin: referenceId,
    name: variantName,
    brand: { name: brandName },
    isVariantOf: { name, productGroupID: productId },
    image: [img],
    offers: { lowPrice: spotPrice, offers },
  } = product

  const { listPrice, seller } = useMemo(
    () => offers.find((x) => x.price === spotPrice)!,
    [spotPrice, offers]
  )

  const linkProps = useProductLink(product)
  const image = useImage(img.url, 'product.summary')
  const buyProps = useBuyButton({
    id,
    name,
    brand: brandName,
    price: spotPrice,
    listPrice,
    seller,
    quantity: 1,
    referenceId,
    productId,
    itemOffered: {
      name: variantName,
      image: [img],
      sku,
    },
  })

  const formattedListPrice = useFormattedPrice(listPrice)
  const formattedSpotPrice = useFormattedPrice(spotPrice)

  return (
    <section style={{ maxWidth: 300, height: 450 }}>
      <Link {...linkProps}>
        <article className="flex flex-col justify-between h-full">
          <div className="relative">
            <GatsbyImage
              className="w-full"
              image={image}
              alt={img.alternateName}
              sizes="(max-width: 768px) 200px, 320px"
            />
            <DiscountBadge listPrice={listPrice} spotPrice={spotPrice} />
          </div>

          <h1 className="font-semibold">{name}</h1>

          <div className="flex flex-col">
            {listPrice !== spotPrice && (
              <span
                data-testid="list-price"
                data-value={listPrice}
                className="line-through font-light text-gray-400"
              >
                {formattedListPrice}
              </span>
            )}
            <span
              className="font-semibold"
              data-testid="price"
              data-value={spotPrice}
            >
              {formattedSpotPrice}
            </span>
          </div>

          <Button
            style={{ borderColor: '#134cd8', borderWidth: '0.125rem' }}
            className="border-solid border-blue-700 border-2 rounded text-white bg-blue-600"
            {...buyProps}
          >
            <div className="flex items-center justify-center py-1">
              Add to cart
            </div>
          </Button>
        </article>
      </Link>
    </section>
  )
}

export const fragment = graphql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    brand {
      brandName: name
    }
    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
  }
`

export default ProductSummary
