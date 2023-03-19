import { getAllProducts, Products} from '@/type/products';
import { BaseLayout } from '@/components/BaseLayout';
import type { InferGetStaticPropsType } from 'next';
import { ProductsList } from '@/components/products/ProductsList';


type StaticProps = {
	props: {
		allProducts: Products;
	};
};

export async function getStaticProps(): Promise<StaticProps> {
	const allProducts = await getAllProducts();
	return {
		props: {
			allProducts
		}
	};
}

export default function Shop({allProducts}: InferGetStaticPropsType<typeof getStaticProps>)
{
	return (
		<BaseLayout url='/shop'>
			<ProductsList allProducts={allProducts} />
		</BaseLayout>
	);
}
