import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Input, MenuItem, FormControl, Select, Button, AppBar,
    Checkbox, FormControlLabel, FormHelperText, TextField, Alert, Stack, Link } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import './App.css';

import useDesproteger from './hooks/useDesproteger';

function HammingDesproteger() {

    const { desproteccionActiva, mensajeDesproteger, textoDesprotegerOriginal, textoDesprotegerGenerado,
        esperandoRespuestaDesproteger, esperandoRespuestaGuardarAPI, setEsperandoRespuestaGuardarAPI, guardarArchivoDesprotegido,
        setEsperandoRespuestaDesproteger, setMensajeDesproteger, desprotegerArchivo, resetearDesproteger } = useDesproteger();

    const [fileHammingDesproteger, setFileHammingDesproteger] = useState(null);
    const [corregirError, setCorregirError] = useState(false);
    const [moduloHammingDesproteger, setModuloHammingDesproteger] = useState(256);

    const [errorFileDesproteger, setErrorFileDesproteger] = useState(false);
    const [errorMessageFileDesproteger, setErrorMessageFileDesproteger] = useState("");

    const [textoDesprotegerOriginalPaginado, setTextoDesprotegerOriginalPaginado] = useState("");
    const [paginaActualOriginal, setPaginaActualOriginal] = useState(0);
    const [paginaLimiteOriginal, setPaginaLimiteOriginal] = useState(0);
    const [paginadoActivoOriginal, setPaginadoActivoOriginal] = useState(false);

    const [textoDesprotegerGeneradoPaginado, setTextoDesprotegerGeneradoPaginado] = useState("");
    const [paginaActualGenerado, setPaginaActualGenerado] = useState(0);
    const [paginaLimiteGenerado, setPaginaLimiteGenerado] = useState(0);
    const [paginadoActivoGenerado, setPaginadoActivoGenerado] = useState(false);

    useEffect(() => {
        if (textoDesprotegerOriginal) {
            if (textoDesprotegerOriginal.length < 10000) {
                setTextoDesprotegerOriginalPaginado(textoDesprotegerOriginal);
            } else {
                setPaginaActualOriginal(0);
                setPaginaLimiteOriginal(Math.ceil(textoDesprotegerOriginal.length / 10000) - 1);
                setTextoDesprotegerOriginalPaginado(textoDesprotegerOriginal.substring(0,10000));
                setPaginadoActivoOriginal(true);
            }
        } else {
            setPaginaActualOriginal(0);
            setPaginaLimiteOriginal(0);
            setPaginadoActivoOriginal(false)
        }
    }, [textoDesprotegerOriginal]);

    const proximaPaginaOriginal = () => {
        let proximaPagina = paginaActualOriginal + 1;
        setPaginaActualOriginal(proximaPagina);
        if (proximaPagina == paginaLimiteOriginal) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoDesprotegerOriginalPaginado(textoDesprotegerOriginal.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoDesprotegerOriginalPaginado(textoDesprotegerOriginal.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorOriginal = () => {
        let paginaAnterior = paginaActualOriginal - 1;
        setPaginaActualOriginal(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoDesprotegerOriginalPaginado(textoDesprotegerOriginal.substring(limiteInferior,limiteSuperior));
    }

    useEffect(() => {
        if (textoDesprotegerGenerado) {
            if (textoDesprotegerGenerado.length < 10000) {
                setTextoDesprotegerGeneradoPaginado(textoDesprotegerGenerado);
            } else {
                setPaginaActualGenerado(0);
                setPaginaLimiteGenerado(Math.ceil(textoDesprotegerGenerado.length / 10000) - 1);
                setTextoDesprotegerGeneradoPaginado(textoDesprotegerGenerado.substring(0,10000));
                setPaginadoActivoGenerado(true);
            }
        } else {
            setPaginaActualGenerado(0);
            setPaginaLimiteGenerado(0);
            setPaginadoActivoGenerado(false)
        }
    }, [textoDesprotegerGenerado]);

    const proximaPaginaGenerado = () => {
        let proximaPagina = paginaActualGenerado + 1;
        setPaginaActualGenerado(proximaPagina);
        if (proximaPagina == paginaLimiteGenerado) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoDesprotegerGeneradoPaginado(textoDesprotegerGenerado.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoDesprotegerGeneradoPaginado(textoDesprotegerGenerado.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorGenerado = () => {
        let paginaAnterior = paginaActualGenerado - 1;
        setPaginaActualGenerado(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoDesprotegerGeneradoPaginado(textoDesprotegerGenerado.substring(limiteInferior,limiteSuperior));
    }

    const handleChangeFileHammingDesproteger = (e) => {
        e.preventDefault();
        setFileHammingDesproteger(e.target.files[0]);
    } 

    const handleChangeModuloHammingDesproteger = (e) => {
        setModuloHammingDesproteger(e.target.value);
    } 

    const handleChangeCorregirError = () => {
        setCorregirError(!corregirError);
    } 

    const onClickDesprotegerHamming = async () => {
        if (fileHammingDesproteger == null) {
            setErrorMessageFileDesproteger("Debe seleccionar un archivo.");
            setErrorFileDesproteger(true);
            return
        } else {
            setErrorMessageFileDesproteger("");
            setErrorFileDesproteger(false);
        }
        
        let extension = fileHammingDesproteger.name.split('.').pop();
        if (extension !== "HA1" && extension !== "HA2" && extension !== "HA3" && extension !== "HA4" && extension !== "HE1" && extension !== "HE2" && extension !== "HE3" && extension !== "HE4") {
            setErrorMessageFileDesproteger("El archivo seleccionado debe tener extensión '.HAX' o '.HEX'.");
            setErrorFileDesproteger(true);
            return
        } else {
            setErrorMessageFileDesproteger("");
            setErrorFileDesproteger(false);
        }     
        
        setEsperandoRespuestaDesproteger(true);
        desprotegerArchivo(moduloHammingDesproteger, fileHammingDesproteger.name, corregirError)
        .catch(error => console.log(error));
    }  

    const onClickGuardarArchivoDesprotegido = () => {
        let extension = "";
        if (moduloHammingDesproteger == 256) {
            extension = ".DE1";
        } else {
            if (moduloHammingDesproteger == 1024) {
                extension = ".DE2";
            } else {
                if (moduloHammingDesproteger == 2048) {
                    extension = ".DE3";
                } else {
                    extension = ".DE4";
                }
            }
        }
        
        let nombre = fileHammingDesproteger.name.split('.')[0] + extension;
        setEsperandoRespuestaGuardarAPI(true);
        guardarArchivoDesprotegido(nombre)
        .catch(error => console.log(error));
    }

    return (
        <>
        <Box>
            <AppBar position="static" sx={{ paddingBlock: 1, alignItems: 'center' }} color="secondary">
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
                        DESPROTEGER
                    </Button>
                    <Button color="inherit">
                        <Link href="/huffman/compactar" underline="none" color="inherit">
                            COMPACTAR
                        </Link>
                    </Button>
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
                    <Typography variant="h4" color="secondary" sx={{textAlign: 'center'}}>
                        <b>HAMMING (Desproteger)</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ flexDirection: "row" }} variant="standard">
                        <Box>
                            <Input 
                                error={errorFileDesproteger}
                                type="file" 
                                sx={{ marginInlineEnd: 2 }} 
                                onChange={handleChangeFileHammingDesproteger} 
                                disabled={desproteccionActiva}
                                color="secondary"
                            />
                            <FormHelperText error>{errorMessageFileDesproteger}</FormHelperText>
                        </Box>
                        <Box>
                            <Select
                                id="modulo-hamming"
                                value={moduloHammingDesproteger}
                                onChange={handleChangeModuloHammingDesproteger}
                                sx={{ marginInlineStart: 2, marginInlineEnd: 2 }}
                                disabled={desproteccionActiva}
                                color="secondary"
                            >
                                <MenuItem value={256}>256 bits</MenuItem>
                                <MenuItem value={1024}>1024 bits</MenuItem>
                                <MenuItem value={2048}>2048 bits</MenuItem>
                                <MenuItem value={4096}>4096 bits</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                            <FormControlLabel 
                                control={<Checkbox color="secondary" checked={corregirError} onChange={handleChangeCorregirError} disabled={desproteccionActiva} />} 
                                label="Corregir Error"
                                sx={{ marginInlineStart: 2, marginInlineEnd: 2 }}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" disabled={desproteccionActiva}  color="secondary"
                                sx={{ marginInlineStart: 2 }} 
                                onClick={onClickDesprotegerHamming}
                            >
                                Desproteger
                            </Button>
                            <Button variant="contained" color="secondary" disabled={!desproteccionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickGuardarArchivoDesprotegido}>
                                Guardar Archivo
                            </Button>
                            <Button variant="contained" color="secondary" disabled={!desproteccionActiva} sx={{ marginInlineStart: 2 }} onClick={resetearDesproteger}>
                                Resetear
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid container xs={12} sx={{ marginBlockStart: 1 }}>
                    {esperandoRespuestaDesproteger || esperandoRespuestaGuardarAPI ?  
                        <Alert severity={"warning"} onClose={() => setMensajeDesproteger(null)}>Esperando respuesta de la API...</Alert>
                    :
                        mensajeDesproteger ? 
                            <Alert severity={mensajeDesproteger.tipo} onClose={() => setMensajeDesproteger(null)}>{mensajeDesproteger.mensaje}</Alert>
                        : null
                    }   
                </Grid>
                <Grid container sx={{ marginBlockStart: 2 }}>
                    <Grid item xs>
                        <Button variant="contained" size="small" color="secondary">
                            Archivo Original
                        </Button>
                        {desproteccionActiva ? 
                            esperandoRespuestaDesproteger ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoDesprotegerOriginal ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoDesprotegerOriginalPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="secondary" onClick={paginaAnteriorOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="secondary" onClick={proximaPaginaOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == paginaLimiteOriginal)}>
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
                        {desproteccionActiva ? 
                            <ForwardIcon fontSize="large" color="secondary"/>
                        :
                            <ForwardIcon fontSize="large" color="disabled"/>
                        }
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color="secondary" size="small" disabled={!desproteccionActiva}>
                            Archivo Generado
                        </Button>
                        {desproteccionActiva ? 
                            esperandoRespuestaDesproteger ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoDesprotegerGenerado ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoDesprotegerGeneradoPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button color="secondary" onClick={paginaAnteriorGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button color="secondary" onClick={proximaPaginaGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == paginaLimiteGenerado)}>
                                                <ChevronRight />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </>
                                :
                                    <TextField multiline variant="outlined" disabled maxRows={12}
                                        sx={{ width: "100%" }}
                                        value={"Procesando texto..."}
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

export default HammingDesproteger;
