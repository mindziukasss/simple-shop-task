import type { ReactNode } from 'react';
import { NavBar } from '@/components/navBar/NavBar';

type AppLayoutProps = {
	children: ReactNode;
};

const Layout = ({children}: AppLayoutProps) => {
	return (
		<>
			<NavBar/>
			{children}
		</>
	);
};

export default Layout;
