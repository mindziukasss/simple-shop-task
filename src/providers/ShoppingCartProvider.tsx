import { ChangeEvent, createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/type/products';
import { CartContext } from '@/context/CarContext';

type Cart = Product & { quantity: number };
type Carts = Cart[];

type ShoppingCartProviderProps = {
	children: ReactNode;
};

export function ShoppingCartProvider({children}: ShoppingCartProviderProps)
{
	const [currentCart, setCurrentCart] = useLocalStorage<Carts>('storageCart', []);

	const addProduct = (productData: Product) => (): void =>
		setCurrentCart([{ ...productData, quantity: 1 }, ...currentCart]);

	const deleteProduct = (productId: number) => (): void =>
		setCurrentCart(currentCart.filter(({ id }) => id !== productId));

	const handleProductQuantity =
		(productId: number, type?: 'add' | 'takeOut') =>
			(e?: ChangeEvent<HTMLInputElement>): void => {
				let inputValue = !type ? parseInt(e?.target.value as string, 10) : null;

				if (!type && !inputValue) inputValue = 1;
				else if (inputValue && inputValue >= 1000) inputValue = 1000;
				setCurrentCart(
					currentCart.map((cartProduct) =>
						cartProduct.id === productId
							? {
								...cartProduct,
								quantity:
									inputValue ??
									(type === 'add'
											? cartProduct.quantity + 1
											: cartProduct.quantity === 1 ?
												deleteProduct(cartProduct.id) :
												cartProduct.quantity - 1
									)
							}
							: cartProduct
					)
				);
			};

	const clearCart = (): void => setCurrentCart([]);

	const [cartProducts, totalPrice] = currentCart.reduce(
		([products, total], { price, quantity }) => [
			products + quantity,
			total + price * quantity
		],
		[0, 0]
	);

	const value = {
		totalPrice,
		currentCart,
		cartProducts,
		clearCart,
		addProduct,
		deleteProduct,
		handleProductQuantity
	};

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	);
}
