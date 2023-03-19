import type { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { getAllProductsId, getProductData } from '@/type/products';
import { ProductView } from '@/components/products/ProductView';
import type { Params, Product } from '@/type/products'

export async function getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
    const paths = await getAllProductsId();

    return {
        paths,
        fallback: 'blocking'
    };
}

type ProductProps = {
    prodId: string;
    productData: Product | null;
};

export async function getStaticProps({params}: GetStaticPropsContext<Params>): Promise<GetStaticPropsResult<ProductProps>> {
    const { prodId } = params!;
    const productData = await getProductData(prodId);

    return {
        props: {
            prodId,
            productData
        }
    };
}

export default function Product({prodId, productData}: InferGetStaticPropsType<typeof getStaticProps>) {
    return  productData ? (
        <ProductView prodId={prodId} productData={productData} />
    ) : (
        <>Not Found product</>
    )
}
