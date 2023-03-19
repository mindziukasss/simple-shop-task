import {Box, Button, IconButton, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '@/type/products';
import { useShoppingCart } from '@/context/CarContext';

type AddCartProps = {
    id: number;
    productData: Product;
};

export default function AddProductCart({id, productData}: AddCartProps) {

    const [productQuantity, setProductQuantity] = useState(0);

    const { currentCart, addProduct, deleteProduct, handleProductQuantity } =
        useShoppingCart();

    const { quantity } = currentCart.find(({ id: cartId }) => cartId === id) ?? {};

    useEffect(() => {
        setProductQuantity(quantity ?? 0);
    }, [quantity]);

    const block = productQuantity ? (
        <Box>
            <IconButton>
                <RemoveIcon fontSize={'large'} onClick={handleProductQuantity(
                    id,
                    'takeOut')}
                            disabled={productQuantity < 1}
                />
            </IconButton>
            <TextField
                min={1}
                max={1000}
                value={productQuantity}
                onChange={handleProductQuantity(id)}
                type="number"
            />
            <Button>
                <AddIcon
                    fontSize={'large'}
                    onClick={handleProductQuantity(
                        id,
                        'add')}
                    disabled={productQuantity >= 1000}
                />
            </Button>
            <Button variant="outlined" onClick={deleteProduct(id)}>Remove</Button>
        </Box>
    ) : (
        <Button variant="outlined" onClick={addProduct(productData)}>Add to cart</Button>
    )

    return (
        <div>
            {block}
        </div>
    )
}
