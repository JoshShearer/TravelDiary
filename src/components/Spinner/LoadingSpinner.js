import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Stack';
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


    const LoadingSpinner = () => (
     <StyledEngineProvider injectFirst>
       <ThemeProvider theme={theme}>
            <Box
       
            sx={{
                 mx: '50%',
                 my: '50%',
                 // width: 200,
                 alignItems: 'center',
                 display: 'flex'          
            }} >
            <CircularProgress color='primary'/>

            </Box>
       </ThemeProvider>
     </StyledEngineProvider>
    );

    export default LoadingSpinner;