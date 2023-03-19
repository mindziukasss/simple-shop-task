import type { ReactNode } from 'react';

type BaseLayoutProps = {
	children: ReactNode;
	url?: string;

};

export function BaseLayout({children}: BaseLayoutProps) {

	return (
		<>{children}</>
	);
}
