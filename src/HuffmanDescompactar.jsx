import React, { useState, useEffect } from 'react';
import { Box,  Grid, Typography, Input, FormControl, Button, Link,
     FormHelperText, TextField, Alert, AppBar, Stack } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import './App.css';

import useDescompactar from './hooks/useDescompactar';

function HuffmanDescompactar() {

    const { descompactacionActiva, mensajeDescompactar, textoDescompactarOriginal, textoDescompactarGenerado,
        esperandoRespuestaDescompactarAPI, descompactarArchivo, setTextoDescompactarGenerado,
        setTextoDescompactarOriginal, setEsperandoRespuestaDescompactarAPI, setMensajeDescompactar, resetearDescompactar } = useDescompactar();

    const [fileHuffmanOriginal, setFileHuffmanOriginal] = useState(null);
    const [fileHuffmanGenerado, setFileHuffmanGenerado] = useState(null);
    const [fileHuffmanGeneradoAbierto, setFileHuffmanGeneradoAbierto] = useState(false);

    const [errorFileDescompactar, setErrorFileDescompactar] = useState(false);
    const [errorMessageFileDescompactar, setErrorMessageFileDescompactar] = useState("");
    const [errorMessageFileDescompactada, setErrorMessageFileDescompactada] = useState("");

    const [textoDescompactarOriginalPaginado, setTextoDescompactarOriginalPaginado] = useState("");
    const [paginaActualOriginal, setPaginaActualOriginal] = useState(0);
    const [paginaLimiteOriginal, setPaginaLimiteOriginal] = useState(0);
    const [paginadoActivoOriginal, setPaginadoActivoOriginal] = useState(false);
    const [textoDescompactarGeneradoPaginado, setTextoDescompactarGeneradoPaginado] = useState("");
    const [paginaActualGenerado, setPaginaActualGenerado] = useState(0);
    const [paginaLimiteGenerado, setPaginaLimiteGenerado] = useState(0);
    const [paginadoActivoGenerado, setPaginadoActivoGenerado] = useState(false);

    useEffect(() => {
        if (textoDescompactarOriginal) {
            if (textoDescompactarOriginal.length < 10000) {
                setTextoDescompactarOriginalPaginado(textoDescompactarOriginal);
            } else {
                setPaginaActualOriginal(0);
                setPaginaLimiteOriginal(Math.ceil(textoDescompactarOriginal.length / 10000) - 1);
                setTextoDescompactarOriginalPaginado(textoDescompactarOriginal.substring(0,10000));
                setPaginadoActivoOriginal(true);
            }
        } else {
            setPaginaActualOriginal(0);
            setPaginaLimiteOriginal(0);
            setPaginadoActivoOriginal(false);
        }
    }, [textoDescompactarOriginal]);

    const proximaPaginaOriginal = () => {
        let proximaPagina = paginaActualOriginal + 1;
        setPaginaActualOriginal(proximaPagina);
        if (proximaPagina == paginaLimiteOriginal) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoDescompactarOriginalPaginado(textoDescompactarOriginal.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoDescompactarOriginalPaginado(textoDescompactarOriginal.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorOriginal = () => {
        let paginaAnterior = paginaActualOriginal - 1;
        setPaginaActualOriginal(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoDescompactarOriginalPaginado(textoDescompactarOriginal.substring(limiteInferior,limiteSuperior));
    }

    useEffect(() => {
        if (textoDescompactarGenerado) {
            if (textoDescompactarGenerado.length < 10000) {
                setTextoDescompactarGeneradoPaginado(textoDescompactarGenerado);
            } else {
                setPaginaActualGenerado(0);
                setPaginaLimiteGenerado(Math.ceil(textoDescompactarGenerado.length / 10000) - 1);
                setTextoDescompactarGeneradoPaginado(textoDescompactarGenerado.substring(0,10000));
                setPaginadoActivoGenerado(true);
            }
        } else {
            setPaginaActualGenerado(0);
            setPaginaLimiteGenerado(0);
            setPaginadoActivoGenerado(false);
        }
    }, [textoDescompactarGenerado]);

    const proximaPaginaGenerado = () => {
        let proximaPagina = paginaActualGenerado + 1;
        setPaginaActualGenerado(proximaPagina);
        if (proximaPagina == paginaLimiteGenerado) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoDescompactarGeneradoPaginado(textoDescompactarGenerado.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoDescompactarGeneradoPaginado(textoDescompactarGenerado.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorGenerado = () => {
        let paginaAnterior = paginaActualGenerado - 1;
        setPaginaActualGenerado(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoDescompactarGeneradoPaginado(textoDescompactarGenerado.substring(limiteInferior,limiteSuperior));
    }

    const handleChangeFileHuffmanOriginal = (e) => {
        e.preventDefault();
        setFileHuffmanOriginal(e.target.files[0]);
    } 

    const handleChangeFileHuffmanGenerado = (e) => {
        e.preventDefault();
        setFileHuffmanGenerado(e.target.files[0]);
    } 

    const onClickDescompactarHuffman = async () => {
        if (fileHuffmanOriginal == null) {
            setErrorMessageFileDescompactar("Debe seleccionar un archivo.");
            setErrorFileDescompactar(true);
            return
        } else {
            setErrorMessageFileDescompactar("");
            setErrorFileDescompactar(false);
        }
        
        let extension = fileHuffmanOriginal.name.split('.').pop();
        if (extension !== "txt") {
            setErrorMessageFileDescompactar("El archivo seleccionado debe tener extensión '.txt'.");
            setErrorFileDescompactar(true);
            return
        } else {
            setErrorMessageFileDescompactar("");
            setErrorFileDescompactar(false);
        }        

        setEsperandoRespuestaDescompactarAPI(true);
        
        descompactarArchivo(fileHuffmanOriginal)
        .then(() => leerArchivoOriginal(fileHuffmanOriginal))
        .catch(error => console.log(error));
    }  

    const leerArchivoOriginal = async (file) => {
        const reader_original = new FileReader();
        reader_original.onload = (e) => {
            const text = e.target.result;
            setTextoDescompactarOriginal(text);
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
                setTextoDescompactarGenerado(text);
            };
            reader.readAsText(fileHuffmanGenerado);
            setFileHuffmanGeneradoAbierto(true);
            setErrorMessageFileDescompactada("");
        } else {
            setErrorMessageFileDescompactada("Debe seleccionar un archivo.");
            setFileHuffmanGeneradoAbierto(false);
        }
    }

    const onClickResetear = () => {
        setFileHuffmanGeneradoAbierto(false);
        resetearDescompactar();
        setErrorMessageFileDescompactada("");
    }

    return (
    <>
        <Box>
            <AppBar position="static" sx={{ paddingBlock: 1, alignItems: 'center' }} color="fourth">
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
                    <Button color="inherit">
                        <Link href="/huffman/compactar" underline="none" color="inherit">
                            DESCOMPACTAR
                        </Link>
                    </Button>
                    <Button color="inherit">DESCOMPACTAR</Button>
                </Stack>
            </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1, marginBlock: 2, marginInline: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="#ff6090" sx={{textAlign: 'center'}}>
                        <b>HUFFMAN (Descompactar)</b>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ flexDirection: "row" }} variant="standard">
                        <Box>
                            <Input 
                                error={errorFileDescompactar}
                                type="file" 
                                sx={{ marginInlineEnd: 2 }} 
                                onChange={handleChangeFileHuffmanOriginal} 
                                disabled={descompactacionActiva}
                                color="fourth"
                            />
                            <FormHelperText error>{errorMessageFileDescompactar}</FormHelperText>
                        </Box>
                        <Box>
                            <Button variant="contained" color="fourth" disabled={descompactacionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickDescompactarHuffman}>
                                Descompactar
                            </Button>
                            <Button variant="contained" color="fourth" disabled={!descompactacionActiva} sx={{ marginInlineStart: 2 }} onClick={() => onClickResetear()}>
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
                                disabled={!descompactacionActiva}
                                color="fourth"
                            />
                            <FormHelperText error>{errorMessageFileDescompactada}</FormHelperText>
                        </Box>
                        <Box>
                            <Button variant="contained" color="fourth" disabled={!descompactacionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickLeerArchivoGenerado}>
                                Abrir
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid container xs={12} sx={{ marginBlockStart: 1 }}>
                    {esperandoRespuestaDescompactarAPI ? 
                        <Alert severity={"warning"} onClose={() => setMensajeDescompactar(null)}>Esperando respuesta de la API...</Alert>
                    :
                        mensajeDescompactar ? 
                            <Alert severity={mensajeDescompactar.tipo} onClose={() => setMensajeDescompactar(null)}>{mensajeDescompactar.mensaje}</Alert>
                        : null
                    } 
                </Grid>
                <Grid container sx={{ marginBlockStart: 2 }}>
                    <Grid item xs>
                        <Button variant="contained" size="small" color="fourth">
                            Archivo Original
                        </Button>
                        {descompactacionActiva ? 
                            esperandoRespuestaDescompactarAPI ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoDescompactarOriginal ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoDescompactarOriginalPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="fourth" onClick={paginaAnteriorOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="fourth" onClick={proximaPaginaOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == paginaLimiteOriginal)}>
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
                        {descompactacionActiva ? 
                            <ForwardIcon fontSize="large" color="fourth"/>
                        :
                            <ForwardIcon fontSize="large" color="disabled"/>
                        }
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" size="small" disabled={!descompactacionActiva} color="fourth">
                            Archivo Generado
                        </Button>
                        {descompactacionActiva ? 
                            !fileHuffmanGeneradoAbierto ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoDescompactarGenerado ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoDescompactarGeneradoPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="fourth" onClick={paginaAnteriorGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="fourth" onClick={proximaPaginaGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == paginaLimiteGenerado)}>
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

export default HuffmanDescompactar;
