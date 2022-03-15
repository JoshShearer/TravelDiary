import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
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




export default function DarkButton(props) {
  
    return (
        
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <Link to={props.page} style={{ textDecoration: 'none' }}>
                    <Button
                        color= "primary"
                        variant="outlined"
                        sx={{mx: '50%'}}  
                        onClick={props.click}                
                    >
                    {props.buttonText}
                    </Button>
                  </Link>
                </ThemeProvider>
            </StyledEngineProvider>
    );
    }
