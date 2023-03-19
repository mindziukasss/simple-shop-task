import { Search } from '@mui/icons-material';
import { Box, InputBase } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';

export function SearchForm() {
    const {pathname, query: { search }, push} = useRouter();
    const [searchInput, setSearchInput] = useState<string | string[]>('');

    useEffect(() => {
        if (!search) setSearchInput('');
        else setSearchInput(search);
    }, [search, pathname]);

    const handleChange = ({target: { value }}: ChangeEvent<HTMLInputElement>): void => setSearchInput(value);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        void push({
            pathname: '/shop',
            query: {
                ...(searchInput && { search: searchInput }),
            }
        });
    };

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: (theme) => theme.shape.borderRadius,
                    mr: 2,
                    ml: 3,
                }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <Search sx={{marginBottom: '-8px'}}/>
                    <InputBase
                        placeholder="Search product..."
                        sx={{
                            '& .MuiInputBase-input': {
                                width: '27ch',
                                color: 'white',
                                backgroundColor: 'grey'
                            },
                        }}
                        onChange={handleChange}
                        value={searchInput}
                    />
                </Box>
            </Box>
        </>
    );
};

export default SearchForm;
