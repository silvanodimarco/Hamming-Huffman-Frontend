import React, { useState, useEffect } from 'react';
import { Box,  Grid, Typography, Input, MenuItem, FormControl, Select, Button, Link,
    Checkbox, FormControlLabel, FormHelperText, TextField, Alert, AppBar, Stack } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import './App.css';

import useCompactar from './hooks/useCompactar';

function HuffmanCompactar() {

    const { compactacionActiva, mensajeCompactar, textoCompactarOriginal, textoCompactarGenerado,
        esperandoRespuestaCompactarAPI, compactarArchivo, setTextoCompactarGenerado,
        setTextoCompactarOriginal, setEsperandoRespuestaCompactarAPI, setMensajeCompactar, resetearCompactar } = useCompactar();

    const [fileHuffmanOriginal, setFileHuffmanOriginal] = useState(null);
    const [fileHuffmanGenerado, setFileHuffmanGenerado] = useState(null);
    const [fileHuffmanGeneradoAbierto, setFileHuffmanGeneradoAbierto] = useState(false);

    const [errorFileCompactar, setErrorFileCompactar] = useState(false);
    const [errorMessageFileCompactar, setErrorMessageFileCompactar] = useState("");
    const [errorMessageFileCompactada, setErrorMessageFileCompactada] = useState("");

    const [textoCompactarOriginalPaginado, setTextoCompactarOriginalPaginado] = useState("");
    const [paginaActualOriginal, setPaginaActualOriginal] = useState(0);
    const [paginaLimiteOriginal, setPaginaLimiteOriginal] = useState(0);
    const [paginadoActivoOriginal, setPaginadoActivoOriginal] = useState(false);
    const [textoCompactarGeneradoPaginado, setTextoCompactarGeneradoPaginado] = useState("");
    const [paginaActualGenerado, setPaginaActualGenerado] = useState(0);
    const [paginaLimiteGenerado, setPaginaLimiteGenerado] = useState(0);
    const [paginadoActivoGenerado, setPaginadoActivoGenerado] = useState(false);

    useEffect(() => {
        if (textoCompactarOriginal) {
            if (textoCompactarOriginal.length < 10000) {
                setTextoCompactarOriginalPaginado(textoCompactarOriginal);
            } else {
                setPaginaActualOriginal(0);
                setPaginaLimiteOriginal(Math.ceil(textoCompactarOriginal.length / 10000) - 1);
                setTextoCompactarOriginalPaginado(textoCompactarOriginal.substring(0,10000));
                setPaginadoActivoOriginal(true);
            }
        } else {
            setPaginaActualOriginal(0);
            setPaginaLimiteOriginal(0);
            setPaginadoActivoOriginal(false);
        }
    }, [textoCompactarOriginal]);

    const proximaPaginaOriginal = () => {
        let proximaPagina = paginaActualOriginal + 1;
        setPaginaActualOriginal(proximaPagina);
        if (proximaPagina == paginaLimiteOriginal) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoCompactarOriginalPaginado(textoCompactarOriginal.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoCompactarOriginalPaginado(textoCompactarOriginal.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorOriginal = () => {
        let paginaAnterior = paginaActualOriginal - 1;
        setPaginaActualOriginal(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoCompactarOriginalPaginado(textoCompactarOriginal.substring(limiteInferior,limiteSuperior));
    }

    useEffect(() => {
        if (textoCompactarGenerado) {
            if (textoCompactarGenerado.length < 10000) {
                setTextoCompactarGeneradoPaginado(textoCompactarGenerado);
            } else {
                setPaginaActualGenerado(0);
                setPaginaLimiteGenerado(Math.ceil(textoCompactarGenerado.length / 10000) - 1);
                setTextoCompactarGeneradoPaginado(textoCompactarGenerado.substring(0,10000));
                setPaginadoActivoGenerado(true);
            }
        } else {
            setPaginaActualGenerado(0);
            setPaginaLimiteGenerado(0);
            setPaginadoActivoGenerado(false);
        }
    }, [textoCompactarGenerado]);

    const proximaPaginaGenerado = () => {
        let proximaPagina = paginaActualGenerado + 1;
        setPaginaActualGenerado(proximaPagina);
        if (proximaPagina == paginaLimiteGenerado) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoCompactarGeneradoPaginado(textoCompactarGenerado.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoCompactarGeneradoPaginado(textoCompactarGenerado.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorGenerado = () => {
        let paginaAnterior = paginaActualGenerado - 1;
        setPaginaActualGenerado(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoCompactarGeneradoPaginado(textoCompactarGenerado.substring(limiteInferior,limiteSuperior));
    }

    const handleChangeFileHuffmanOriginal = (e) => {
        e.preventDefault();
        setFileHuffmanOriginal(e.target.files[0]);
    } 

    const handleChangeFileHuffmanGenerado = (e) => {
        e.preventDefault();
        setFileHuffmanGenerado(e.target.files[0]);
    } 

    const onClickCompactarHuffman = async () => {
        if (fileHuffmanOriginal == null) {
            setErrorMessageFileCompactar("Debe seleccionar un archivo.");
            setErrorFileCompactar(true);
            return
        } else {
            setErrorMessageFileCompactar("");
            setErrorFileCompactar(false);
        }
        
        let extension = fileHuffmanOriginal.name.split('.').pop();
        if (extension !== "txt") {
            setErrorMessageFileCompactar("El archivo seleccionado debe tener extensión '.txt'.");
            setErrorFileCompactar(true);
            return
        } else {
            setErrorMessageFileCompactar("");
            setErrorFileCompactar(false);
        }        

        setEsperandoRespuestaCompactarAPI(true);
        
        compactarArchivo(fileHuffmanOriginal)
        .then(() => leerArchivoOriginal(fileHuffmanOriginal))
        .catch(error => console.log(error));
    }  

    const leerArchivoOriginal = async (file) => {
        const reader_original = new FileReader();
        reader_original.onload = (e) => {
            const text = e.target.result;
            setTextoCompactarOriginal(text);
        };
        reader_original.readAsText(file);
    }

    const onClickLeerArchivoGenerado = () => {
        setPaginaActualGenerado(0);
        setPaginaLimiteGenerado(0);
        setPaginadoActivoGenerado(false);
        if (fileHuffmanGenerado) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                console.log(text);
                setTextoCompactarGenerado(text);
            };
            reader.readAsText(fileHuffmanGenerado);
            setFileHuffmanGeneradoAbierto(true);
            setErrorMessageFileCompactada("");
        } else {
            setErrorMessageFileCompactada("Debe seleccionar un archivo.");
            setFileHuffmanGeneradoAbierto(false);
        }
    }

    const onClickResetear = () => {
        setFileHuffmanGeneradoAbierto(false);
        resetearCompactar();
        setErrorMessageFileCompactada("");
    }

    return (
    <>
        <Box>
            <AppBar position="static" sx={{ paddingBlock: 1, alignItems: 'center' }} color="tertiary">
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                    TEORÍA DE LA INFORMACIÓN - Silvano Di Marco y Jorge Quevedo
                </Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between', width: "50%" }}>
                <Button color="inherit">
                        <Link href="/hamming/proteger" underline="none" color="inherit">
                            PROTEGER
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/hamming/desproteger" underline="none" color="inherit">
                            DESPROTEGER
                        </Link>
                    </Button>
                    <Button color="inherit">COMPACTAR</Button>
                    <Button color="inherit">
                        <Link href="/huffman/descompactar" underline="none" color="inherit">
                            DESCOMPACTAR
                        </Link>
                    </Button>
                </Stack>
            </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1, marginBlock: 2, marginInline: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="#00bfbf" sx={{textAlign: 'center'}}>
                        <b>HUFFMAN (Compactar)</b>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ flexDirection: "row" }} variant="standard">
                        <Box>
                            <Input 
                                error={errorFileCompactar}
                                type="file" 
                                sx={{ marginInlineEnd: 2 }} 
                                onChange={handleChangeFileHuffmanOriginal} 
                                disabled={compactacionActiva}
                                color="tertiary"
                            />
                            <FormHelperText error>{errorMessageFileCompactar}</FormHelperText>
                        </Box>
                        <Box>
                            <Button variant="contained" color="tertiary" disabled={compactacionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickCompactarHuffman}>
                                Compactar
                            </Button>
                            <Button variant="contained" color="tertiary" disabled={!compactacionActiva} sx={{ marginInlineStart: 2 }} onClick={() => onClickResetear()}>
                                Resetear
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ flexDirection: "row" }} variant="standard">
                        <Box>
                            <Input 
                                type="file" 
                                sx={{ marginInlineEnd: 2 }} 
                                onChange={handleChangeFileHuffmanGenerado} 
                                disabled={!compactacionActiva}
                                color="tertiary"
                            />
                            <FormHelperText error>{errorMessageFileCompactada}</FormHelperText>
                        </Box>
                        <Box>
                            <Button variant="contained" color="tertiary" disabled={!compactacionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickLeerArchivoGenerado}>
                                Abrir
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid container xs={12} sx={{ marginBlockStart: 1 }}>
                    {esperandoRespuestaCompactarAPI ? 
                        <Alert severity={"warning"} onClose={() => setMensajeCompactar(null)}>Esperando respuesta de la API...</Alert>
                    :
                        mensajeCompactar ? 
                            <Alert severity={mensajeCompactar.tipo} onClose={() => setMensajeCompactar(null)}>{mensajeCompactar.mensaje}</Alert>
                        : null
                    } 
                </Grid>
                <Grid container sx={{ marginBlockStart: 2 }}>
                    <Grid item xs>
                        <Button variant="contained" size="small" color="tertiary">
                            Archivo Original
                        </Button>
                        {compactacionActiva ? 
                            esperandoRespuestaCompactarAPI ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoCompactarOriginal ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoCompactarOriginalPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="tertiary" onClick={paginaAnteriorOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="tertiary" onClick={proximaPaginaOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == paginaLimiteOriginal)}>
                                                <ChevronRight />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </>
                                :
                                    <TextField multiline variant="outlined" disabled maxRows={12}
                                        sx={{ width: "100%" }}
                                        value={"Procesando texto original..."}
                                    />
                        :
                            <TextField multiline variant="outlined" disabled maxRows={12}
                                sx={{ width: "100%" }}
                                value={""}
                            />
                        }
                    </Grid>
                    <Grid container xs={1} direction="column" justifyContent="flex-start" alignItems="center">
                        {compactacionActiva ? 
                            <ForwardIcon fontSize="large" color="tertiary"/>
                        :
                            <ForwardIcon fontSize="large" color="disabled"/>
                        }
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" size="small" disabled={!compactacionActiva} color="tertiary">
                            Archivo Generado
                        </Button>
                        {compactacionActiva ? 
                            !fileHuffmanGeneradoAbierto ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoCompactarGenerado ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoCompactarGeneradoPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="tertiary" onClick={paginaAnteriorGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="tertiary" onClick={proximaPaginaGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == paginaLimiteGenerado)}>
                                                <ChevronRight />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </>
                                :
                                    <TextField multiline variant="outlined" disabled maxRows={12}
                                        sx={{ width: "100%" }}
                                        value={""}
                                    />
                        :
                            <TextField multiline variant="outlined" disabled maxRows={12}
                                sx={{ width: "100%" }}
                                value={""}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>
  );
}

export default HuffmanCompactar;
