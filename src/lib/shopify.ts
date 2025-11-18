// Shopify Storefront API Configuration
// Use environment variables for real store credentials
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'duckydrinks.myshopify.com';
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
export const SHOPIFY_API_VERSION = '2024-10';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = SHOPIFY_DOMAIN; // For compatibility with existing code
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = SHOPIFY_TOKEN;

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    tags: string[];
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    throw new Error("Shopify: Payment required. Your store needs to be upgraded to a paid plan.");
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first });
  return data.data.products.edges;
}

const COLLECTION_QUERY = `
  query GetCollection($handle: String!, $numProducts: Int!) {
    collection(handle: $handle) {
      title
      description
      products(first: $numProducts) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export async function getCollectionProducts(collectionHandle: string, numberOfProducts: number = 6): Promise<ShopifyProduct[]> {
  try {
    console.log(`[Shopify API] Querying collection with handle: "${collectionHandle}"`);

    const data = await storefrontApiRequest(COLLECTION_QUERY, {
      handle: collectionHandle,
      numProducts: numberOfProducts
    });

    console.log(`[Shopify API] Response:`, {
      collectionFound: !!data.data.collection,
      collectionTitle: data.data.collection?.title,
      productCount: data.data.collection?.products.edges.length || 0
    });

    if (!data.data.collection) {
      console.warn(`❌ Collection "${collectionHandle}" not found in Shopify`);
      return [];
    }

    const products = data.data.collection.products.edges;
    console.log(`✅ Found ${products.length} products in collection "${collectionHandle}"`);

    return products;
  } catch (error) {
    console.error(`❌ Error fetching collection "${collectionHandle}":`, error);
    return [];
  }
}
