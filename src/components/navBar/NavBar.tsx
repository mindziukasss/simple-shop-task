import { useRouter } from 'next/router';
import { AppBar, Box, Dialog, Stack, Toolbar, Typography} from '@mui/material';
import { useState } from 'react';
import { NavLink } from '@/components/navBar/NavLink';
import CartIcon from '@/components/cart/CartIcon';
import Link from '@/utils/Link';
import SearchForm from '@/components/search/SearchForm';

const navLinks = [
	['Home', '/'],
	['Shop', '/shop'],
	['About', '/about']
];
export function NavBar() {
	const [searchOpen, setSearchOpen] = useState(false);
	const { pathname } = useRouter();
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Link href="/" color="inherit" sx={{textDecoration: 'none'}}>
						<Typography variant="h6" component="h1" noWrap>
							Simple Shop
						</Typography>
					</Link>
					<Box sx={{flexGrow: 1}}/>
					<Stack gap={1} direction="row" alignItems="center" spacing={2}>
						<Box sx={{display: {xs: 'none', sm: 'block'}}}>
							<SearchForm/>
						</Box>
						{navLinks.map(([linkName, url]) => (
							<NavLink
								href={url}
								linkName={linkName}
								pathname={pathname}
								key={url}
							/>
						))}
						<CartIcon/>
					</Stack>
				</Toolbar>
			</AppBar>
			<Dialog
				open={searchOpen}
				onClose={() => setSearchOpen(false)}
				maxWidth="xs"
				PaperProps={{sx: {position: 'fixed', top: 10},}}
				sx={{display: {xs: 'block', sm: 'none'}}}
			>
			</Dialog>
		</>
	);
};
