import { ChangeEvent, createContext, useContext } from 'react';
import {Product} from '@/type/products';

type Cart = Product & { quantity: number };
type Carts = Cart[];

type CartContext = {
	totalPrice: number;
	currentCart: Carts;
	cartProducts: number;
	clearCart: () => void;
	addProduct: (productData: Product) => () => void;
	deleteProduct: (productId: number) => () => void;
	handleProductQuantity: (
		productId: number,
		type?: 'add' | 'takeOut'
	) => (e?: ChangeEvent<HTMLInputElement>) => void;
};

export const CartContext = createContext<CartContext | null>(null);

export function useShoppingCart(): CartContext {
	const context = useContext(CartContext);
	if (!context)
		throw new Error(
			'useShoppingCart must be used within a ContextProvider'
		);

	return context;
}
