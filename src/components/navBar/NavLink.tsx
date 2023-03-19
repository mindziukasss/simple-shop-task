import { Button } from '@mui/material';

type NavLinkProps = {
	href: string;
	linkName: string;
	pathname: string;

};

export function NavLink({href, linkName}: NavLinkProps) {
	return (
		<Button color={'inherit'} href={href} key={href}>
			{linkName}
		</Button>
	);
}
