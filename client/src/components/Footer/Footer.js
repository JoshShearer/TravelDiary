import React from 'react';
// import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import LightButton from "../CustomButtons/LightButton";

// import Item from '@mui/material/Item';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';

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

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.secondary,
//   }));
  
  
  export default function Footer() {
      const [value, setValue] = React.useState(0);
  
    return (
        <BottomNavigation
            
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                p: 1,
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0 ,
                // m: 1,
                // mb:22,
                // mx: 'auto',
                // display:'flex',
                // mt: '50',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#ff8040' : '#ff8040',
                page: (theme) =>
                    theme.palette.mode === 'dark' ? '#ff8040' : '#ff8040',
                borderRadius: 1,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '900',
                                }}
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <LightButton
                        page="/"
                        buttonText="Home" />
                    
                    <LightButton
                        page="/newEntry" 
                        buttonText="Add Entry" />
                    
                    <LightButton
                        page="/route"
                        buttonText="Route" />
                    
                    <LightButton
                        page="/entries"
                        buttonText="Entries" />
                        
                </ThemeProvider>
            </StyledEngineProvider>
            
        </BottomNavigation>
    );
    }
