import React from 'react';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Item from '@mui/material/Item';
import { styled, createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#ff8040',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#e3f2fd',
      },
    },
  }));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.secondary,
}));


export default class Header extends React.Component{
    render (){
        return (
            <div>
                    <Stack
                        
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                            p: 1,
                            // m: 1,
                            mx: 'auto',
                            display:'flex',
                            mt: '50',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            
                            bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? '#ff8040' : '#ff8040',
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#ff8040' : '#ff8040',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#ff8040' : '#ff8040',
                            borderRadius: 1,
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '900',
                                            }}>
                        <StyledEngineProvider injectFirst>
                            <ThemeProvider theme={theme}>
                                <Button
                                    color= "secondary"
                                    variant="outlined"
                                    onClick={() => {
                                        <Link to="/route" />;
                                }}
                                >
                                    Route
                                </Button>
                                <Button
                                    color= "secondary"
                                    variant="outlined"
                                    onClick={() => {
                                        <Link to="/entries" />;
                                }}
                                > 
                                    Entries
                                </Button>
                            </ThemeProvider>
                        </StyledEngineProvider>
                        
                    </Stack>
            </div>
        );
    }
}