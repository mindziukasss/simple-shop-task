import {Button, Box, Avatar, Typography, Grid} from '@mui/material';
import { useShoppingCart } from '@/context/CarContext';
import { formatEUR } from '@/utils/helpers';

type CartItemProps = {
	id: number;
	title: string;
	image: string;
	quantity: number;
	price: number;

};

const CartItem = ({id, title, image, quantity, price}: CartItemProps) => {
	const {handleProductQuantity} = useShoppingCart();
	return (
		<Box>
			<Box
				display={"flex"}
				sx={{paddingTop: 2, paddingBottom: 2}}
				alignItems={"start"}
				justifyContent={"space-between"}
			>
				<Avatar src={image} sx={{width: 56, height: 56, mr: 2}} />
				<Box display={"flex"} flexDirection={'column'}>
					<Typography variant={"h6"}>{title.slice(0, 20)}</Typography>
					<Typography variant={"body1"} justifyContent={"center"}>Price:{formatEUR(price)}</Typography>
				</Box>
			</Box>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs={5}>
					<Button variant="contained" color="primary" onClick={handleProductQuantity(id, 'takeOut')} disabled={quantity < 1 }>
						-
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Typography align="center" variant="overline">
						{quantity}/q
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Button variant="contained" color="secondary" onClick={handleProductQuantity(id, 'add')} disabled={quantity >= 1000}>
						+
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default CartItem;
