import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { formatEUR } from '@/utils/helpers';
import AddProductCart from '@/components/cart/AddProductCart';
import { Product } from '@/type/products';
import { BaseLayout } from '@/components/BaseLayout';

type ProductViewProps = {
	prodId: string;
	productData: Product;
}
export function ProductView({productData}: ProductViewProps) {
	const { id, title, price, description, image,
	} = productData;

	return (
		<BaseLayout>
			<Card sx={{maxWidth: 500}}>
				<CardMedia
					sx={{height: 350}}
					image={image}
					title={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
					<Typography>
						{formatEUR(price)}
					</Typography>
					<AddProductCart id={id} productData={productData} key={price}/>
				</CardContent>
			</Card>
		</BaseLayout>
	);
}
