import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from '@/type/products';
import Link from '@/utils/Link';
import { formatEUR } from '@/utils/helpers';
import { useShoppingCart } from '@/context/CarContext';

type ProductCardProps = {
	productData: Product;

};
const ProductDetails = ({ productData }: ProductCardProps) => {

	const {id, title, image, price} = productData;

	const { currentCart, addProduct, deleteProduct } = useShoppingCart();

	const [productQuantity, setProductQuantity] = useState(0);

	const toProduct = `/shop/${id}`;

	const { quantity } =
	currentCart.find(({ id: cartId }) => cartId === id) ?? {};

	useEffect(() => {
		setProductQuantity(quantity ?? 0);
	}, [quantity]);

	const actionButton = productQuantity
		?
		<IconButton onClick={deleteProduct(id)}>
			<RemoveShoppingCartIcon fontSize={'large'} />
		</IconButton>
		:
		<IconButton onClick={addProduct(productData)}>
			<AddShoppingCartIcon fontSize={'large'}/>
		</IconButton>
	;

	return (
		<Card
			sx={{
				height: '100%',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
			}}
		>
			<CardActionArea sx={{flexGrow: 1}}>
				<Link
					href={toProduct}
					sx={{textDecoration: 'none'}}
				>
					<CardMedia
						component="img"
						sx={{maxHeight: 210, objectFit: 'contain'}}
						image={image}
						alt={title}
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h3">
							{title}
						</Typography>
					</CardContent>
				</Link>
			</CardActionArea>
			<CardActions sx={{justifyContent: 'space-between'}}>
				{actionButton}
				<Typography>
					{formatEUR(price)}
				</Typography>
			</CardActions>
		</Card>
	);
};

export default ProductDetails;
