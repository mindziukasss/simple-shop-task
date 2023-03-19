import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Products } from '@/type/products';
import { filterQuery } from '@/utils/query';
import ProductDetails from '@/components/products/ProductDetails';

type ListingProps = {
  allProducts: Products;
};

export function ProductsList({ allProducts }: ListingProps) {
  const [searchQuery, setSearchQuery] = useState<string | string[]>('');

  const { pathname, query: { search } } = useRouter();

  useEffect(() => {
    if (pathname === '/shop') setSearchQuery(search ?? '');
  }, [search]);

  let filteredProducts = allProducts;
  if (searchQuery)
   filteredProducts = allProducts.filter(({ title }) =>
        filterQuery(title, searchQuery)
    );

  return (
      <>
        <Typography align={'center'} variant={'h4'}>Product List </Typography>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductDetails productData={product} key={product.id} />
              </Grid>
          ))}
        </Grid>
      </>
  );
};

