import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtegerProvider } from './context/ProtegerProvider';
import { DesprotegerProvider } from './context/DesprotegerProvider';
import { CompactarProvider } from './context/CompactarProvider';
import { DescompactarProvider } from './context/DescompactarProvider';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import HammingProteger from './HammingProteger';
import HammingDesproteger from './HammingDesproteger';
import HuffmanCompactar from './HuffmanCompactar';
import HuffmanDescompactar from './HuffmanDescompactar';

const font =  "'Nunito Sans', sans-serif";
const theme = createTheme({
    palette: {
      primary: {
        light: '#63a4ff',
        main: '#1976d2',
        dark: '#004ba0',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff833a',
        main: '#e65100',
        dark: '#b53d00',
        contrastText: '#fff',
      },
      tertiary: {
        light: '#60f2f2',
        main: '#00bfbf',
        dark: '#008e8f',
        contrastText: '#fff',
      },
      fourth: {
        light: '#ff6090',
        main: '#e91e63',
        dark: '#b0003a',
        contrastText: '#fff',
      },
      disabled: {
        main: '#e0e0e0',
        contrastText: '#000'
      }
    },
    typography: {
        fontFamily: font
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <ProtegerProvider>
                    <DesprotegerProvider>
                        <CompactarProvider>
                            <DescompactarProvider>
                                <Routes>
                                    <Route path="/hamming/proteger" element={<HammingProteger />} /> 
                                    <Route path="/hamming/desproteger" element={<HammingDesproteger />} /> 
                                    <Route path="/huffman/compactar" element={<HuffmanCompactar />} /> 
                                    <Route path="/huffman/descompactar" element={<HuffmanDescompactar />} /> 
                                </Routes>
                            </DescompactarProvider>
                        </CompactarProvider>
                    </DesprotegerProvider>
                </ProtegerProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
