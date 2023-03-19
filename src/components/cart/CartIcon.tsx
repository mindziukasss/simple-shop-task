import { useState, useEffect } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import {Badge, Box, Divider, Drawer, IconButton, styled} from '@mui/material';
import List from '@mui/material/List';
import * as React from 'react';
import CartItem from '@/components/cart/CartItem';
import { formatEUR } from '@/utils/helpers';
import { useShoppingCart } from '@/context/CarContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    padding: '0 4px',
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(0,0,0, 0.3)' },
    '70%': { boxShadow: '0 0 0 8px rgba(0,0,0, 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(0,0,0, 0)' },
  },
}));

const CartIcon = () => {

  const { cartProducts, currentCart, totalPrice } =
      useShoppingCart();

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    setTotalProducts(cartProducts);
  }, [cartProducts]);

  type Anchor =  'right';

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer =
        (anchor: 'right', open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
              setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
          <Divider />
          <List>
              <h2>Your Cart</h2>
              {currentCart.length === 0 ? <p>No items in cart.</p> : null}
              {currentCart.map((cartProduct) => (
                  <CartItem
                      key={cartProduct.id}
                      {...cartProduct}
                  />
              ))}
          </List>
            <p className='text-lg'>
                Total:{' '}
                <span className='font-bold'>
                      { formatEUR(totalPrice) }
                    </span>
            </p>
        </Box>
    );

  return (
      <IconButton size="large" color="inherit">
          <ShoppingCart onClick={toggleDrawer('right', true)}/>
          <StyledBadge color="secondary" badgeContent={totalProducts}/>
          <Drawer
              anchor='right'
              open={state['right']}
              onClose={toggleDrawer('right', false)}
          >
              {list('right')}
          </Drawer>
      </IconButton>
  );
};

export default CartIcon;
