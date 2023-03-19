import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, Container } from '@mui/material';
import Layout from '@/components/Layout';
import CssBaseline from '@mui/material/CssBaseline'
import { useRouter } from 'next/router';
import { ShoppingCartProvider } from '@/providers/ShoppingCartProvider';

export default function App({ Component, pageProps }: AppProps) {


  const { pathname } = useRouter();
  return (
  <>
    <CssBaseline />
    <ShoppingCartProvider>
      <Layout>
        <Box>
          <Container sx={{ my: 5 }}>
            <Component {...pageProps} key={pathname} />
          </Container>
        </Box>
      </Layout>
    </ShoppingCartProvider>
    </>
  );
}
