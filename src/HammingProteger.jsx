import React, { useState, useEffect } from 'react';
import { Box,  Grid, Typography, Input, MenuItem, FormControl, Select, Button, Link,
    Checkbox, FormControlLabel, FormHelperText, TextField, Alert, AppBar, Stack } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import './App.css';

import useProteger from './hooks/useProteger';

function HammingProteger() {

    const { proteccionActiva, mensajeProteger, textoProtegerOriginal, textoProtegerGenerado,
        esperandoRespuestaProtegerAPI, esperandoRespuestaGuardarAPI,
        guardarArchivoProtegido, setEsperandoRespuestaGuardarAPI,
        setEsperandoRespuestaProtegerAPI, setMensajeProteger, protegerArchivo, resetearProteger } = useProteger();

    const [fileHammingOriginal, setFileHammingOriginal] = useState(null);
    const [introducirError, setIntroducirError] = useState(false);
    const [moduloHammingProteger, setModuloHammingProteger] = useState(256);

    const [errorFileProteger, setErrorFileProteger] = useState(false);
    const [errorMessageFileProteger, setErrorMessageFileProteger] = useState("");

    const [textoProtegerOriginalPaginado, setTextoProtegerOriginalPaginado] = useState("");
    const [paginaActualOriginal, setPaginaActualOriginal] = useState(0);
    const [paginaLimiteOriginal, setPaginaLimiteOriginal] = useState(0);
    const [paginadoActivoOriginal, setPaginadoActivoOriginal] = useState(false);
    const [textoProtegerGeneradoPaginado, setTextoProtegerGeneradoPaginado] = useState("");
    const [paginaActualGenerado, setPaginaActualGenerado] = useState(0);
    const [paginaLimiteGenerado, setPaginaLimiteGenerado] = useState(0);
    const [paginadoActivoGenerado, setPaginadoActivoGenerado] = useState(false);

    useEffect(() => {
        if (textoProtegerOriginal) {
            if (textoProtegerOriginal.length < 10000) {
                setTextoProtegerOriginalPaginado(textoProtegerOriginal);
            } else {
                setPaginaActualOriginal(0);
                setPaginaLimiteOriginal(Math.ceil(textoProtegerOriginal.length / 10000) - 1);
                setTextoProtegerOriginalPaginado(textoProtegerOriginal.substring(0,10000));
                setPaginadoActivoOriginal(true);
            }
        } else {
            setPaginaActualOriginal(0);
            setPaginaLimiteOriginal(0);
            setPaginadoActivoOriginal(false)
        }
    }, [textoProtegerOriginal]);

    const proximaPaginaOriginal = () => {
        let proximaPagina = paginaActualOriginal + 1;
        setPaginaActualOriginal(proximaPagina);
        if (proximaPagina == paginaLimiteOriginal) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoProtegerOriginalPaginado(textoProtegerOriginal.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoProtegerOriginalPaginado(textoProtegerOriginal.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorOriginal = () => {
        let paginaAnterior = paginaActualOriginal - 1;
        setPaginaActualOriginal(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoProtegerOriginalPaginado(textoProtegerOriginal.substring(limiteInferior,limiteSuperior));
    }

    useEffect(() => {
        if (textoProtegerGenerado) {
            if (textoProtegerGenerado.length < 10000) {
                setTextoProtegerGeneradoPaginado(textoProtegerGenerado);
            } else {
                setPaginaActualGenerado(0);
                setPaginaLimiteGenerado(Math.ceil(textoProtegerGenerado.length / 10000) - 1);
                setTextoProtegerGeneradoPaginado(textoProtegerGenerado.substring(0,10000));
                setPaginadoActivoGenerado(true);
            }
        } else {
            setPaginaActualGenerado(0);
            setPaginaLimiteGenerado(0);
            setPaginadoActivoGenerado(false)
        }
    }, [textoProtegerGenerado]);

    const proximaPaginaGenerado = () => {
        let proximaPagina = paginaActualGenerado + 1;
        setPaginaActualGenerado(proximaPagina);
        if (proximaPagina == paginaLimiteGenerado) {
            let limiteInferior = (proximaPagina * 10000);
            setTextoProtegerGeneradoPaginado(textoProtegerGenerado.substring(limiteInferior));
        } else {
            let limiteInferior = (proximaPagina * 10000);
            let limiteSuperior = limiteInferior + 10000;
            setTextoProtegerGeneradoPaginado(textoProtegerGenerado.substring(limiteInferior,limiteSuperior));
        }
    }

    const paginaAnteriorGenerado = () => {
        let paginaAnterior = paginaActualGenerado - 1;
        setPaginaActualGenerado(paginaAnterior);
        let limiteInferior = (paginaAnterior * 10000);
        let limiteSuperior = limiteInferior + 10000;
        setTextoProtegerGeneradoPaginado(textoProtegerGenerado.substring(limiteInferior,limiteSuperior));
    }
    
    /*
    useEffect(() => {
        let arreglo_decimales = [];
        let arreglo_binarios = [];
        if (respuestaDesprotegerAPI) {
            if (respuestaDesprotegerAPI.length > 0) {
                let contador_bits = 0;
                let string_acumulador = "";
                for (let i = 0; i < respuestaDesprotegerAPI.length; i++) {
                    if (respuestaDesprotegerAPI[i]) {
                        string_acumulador = string_acumulador + "1";
                    } else {
                        string_acumulador = string_acumulador + "0";
                    }
                    contador_bits = contador_bits + 1;
                    if (contador_bits == 8) {
                        arreglo_binarios.push(string_acumulador);
                        let caracter = binaryStringToDecimal(string_acumulador)
                        arreglo_decimales.push(caracter);
                        string_acumulador = "";
                        contador_bits = 0;
                    }
                }
            }
        }
        setArregloModulosBinarioDesproteger(arreglo_binarios);
        setArregloModulosDecimalDesproteger(arreglo_decimales);
    }, [respuestaDesprotegerAPI]);

    useEffect(() => {
        let bits = "";
        for (let i = 0; i < textoOriginal.length; i++) {
            bits += ("000000000" + textoOriginal[i].charCodeAt(0).toString(2)).substr(-8) + " ";
            //bits += textoOriginal[i].charCodeAt(0).toString(2) + " ";
        }
        setTextoOriginalBits(bits);
    }, [textoOriginal]);
    
    useEffect(() => {
        let arreglo_decimales = []
        let arreglo_binarios = []
        let respuesta = []
        if (respuestaHammingAPI) {
            let cantidad_modulos = respuestaHammingAPI.length;
            for (let i = 0; i < cantidad_modulos; i++) {
                respuesta = moduleToDecimalArray(respuestaHammingAPI[i])
                arreglo_binarios.push(respuesta[0]);
                arreglo_decimales.push(respuesta[1]);
            }
        }
        setArregloModulosBinario(arreglo_binarios);
        setArregloModulosDecimal(arreglo_decimales);   
    }, [respuestaHammingAPI]);

    useEffect(() => {
        let textoGen = "";
        if (arregloModulosDecimal.length > 0) {
            for (let i = 0; i < arregloModulosDecimal.length; i++) {
                for (let j = 0; j < cantidadBytesModulo; j++) {
                    textoGen = textoGen + String.fromCharCode(arregloModulosDecimal[i][j]);
                }
            }
            setTextoGenerado(textoGen);
        } else {
            setTextoGenerado("");
        }
    }, [arregloModulosDecimal]);

    useEffect(() => {
        let textoGenBits = "";
        /*
        if (arregloModulosBinario.length > 0) {
            for (let i = 0; i < arregloModulosBinario.length; i++) {
                for (let j = 0; j < cantidadBytesModulo; j++) {
                    textoGenBits = textoGenBits + arregloModulosBinario[i][j] + " ";
                }
            }
            setTextoGeneradoBits(textoGenBits.trim());
        } else {
            setTextoGeneradoBits("");
        }
        
    }, [arregloModulosBinario]);
    */

    const handleChangeFileHamming = (e) => {
        e.preventDefault();
        setFileHammingOriginal(e.target.files[0]);
    } 

    const handleChangeIntroducirError = () => {
        setIntroducirError(!introducirError);
    } 

    const onClickProtegerHamming = async () => {
        if (fileHammingOriginal == null) {
            setErrorMessageFileProteger("Debe seleccionar un archivo.");
            setErrorFileProteger(true);
            return
        } else {
            setErrorMessageFileProteger("");
            setErrorFileProteger(false);
        }
        
        let extension = fileHammingOriginal.name.split('.').pop();
        if (extension !== "txt") {
            setErrorMessageFileProteger("El archivo seleccionado debe tener extensión '.txt'.");
            setErrorFileProteger(true);
            return
        } else {
            setErrorMessageFileProteger("");
            setErrorFileProteger(false);
        }        

        setEsperandoRespuestaProtegerAPI(true);
        protegerArchivo(moduloHammingProteger, fileHammingOriginal.name, introducirError)
        .catch(error => console.log(error));
    }  

    const onClickGuardarArchivoProtegido = () => {
        let nombre = "";
        if (introducirError) {
            nombre = fileHammingOriginal.name.split('.')[0] + ".HE";
        } else {
            nombre = fileHammingOriginal.name.split('.')[0] + ".HA";
        }
        if (moduloHammingProteger == 256) {
            nombre = nombre + "1";
        } else {
            if (moduloHammingProteger == 1024) {
                nombre = nombre + "2";
            } else {
                if (moduloHammingProteger == 2048) {
                    nombre = nombre + "3";
                } else {
                    nombre = nombre + "4";
                }
            }
        }

        setEsperandoRespuestaGuardarAPI(true);
        guardarArchivoProtegido(nombre)
        .catch(error => console.log(error));
    }

    const handleChangeModuloHammingProteger = (e) => {
        setModuloHammingProteger(e.target.value);
    } 

  return (
    <>
        <Box >
            <AppBar position="static" sx={{ paddingBlock: 1, alignItems: 'center' }}>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                    TEORÍA DE LA INFORMACIÓN - Silvano Di Marco y Jorge Quevedo
                </Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between', width: "50%" }}>
                    <Button color="inherit">PROTEGER</Button>
                    <Button color="inherit">
                        <Link href="/hamming/desproteger" underline="none" color="inherit">
                            DESPROTEGER
                        </Link>
                    </Button>
                </Stack>
            </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1, marginBlock: 2, marginInline: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="primary" sx={{textAlign: 'center'}}>
                        <b>HAMMING (Proteger)</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ flexDirection: "row" }} variant="standard">
                        <Box>
                            <Input 
                                error={errorFileProteger}
                                type="file" 
                                sx={{ marginInlineEnd: 2 }} 
                                onChange={handleChangeFileHamming} 
                                disabled={proteccionActiva}
                            />
                            <FormHelperText error>{errorMessageFileProteger}</FormHelperText>
                        </Box>
                        <Box>
                            <Select
                                id="modulo-hamming"
                                value={moduloHammingProteger}
                                onChange={handleChangeModuloHammingProteger}
                                sx={{ marginInlineStart: 2, marginInlineEnd: 2 }}
                                disabled={proteccionActiva}
                            >
                                <MenuItem value={256}>256 bits</MenuItem>
                                <MenuItem value={1024}>1024 bits</MenuItem>
                                <MenuItem value={2048}>2048 bits</MenuItem>
                                <MenuItem value={4096}>4096 bits</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                            <FormControlLabel 
                                control={<Checkbox checked={introducirError} onChange={handleChangeIntroducirError} disabled={proteccionActiva} />} 
                                label="Introducir Error"
                                sx={{ marginInlineStart: 2, marginInlineEnd: 2 }}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" disabled={proteccionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickProtegerHamming}>
                                Proteger
                            </Button>
                            <Button variant="contained" disabled={!proteccionActiva} sx={{ marginInlineStart: 2 }} onClick={onClickGuardarArchivoProtegido}>
                                Guardar Archivo
                            </Button>
                            <Button variant="contained" disabled={!proteccionActiva} sx={{ marginInlineStart: 2 }} onClick={resetearProteger}>
                                Resetear
                            </Button>
                        </Box>
                    </FormControl>
                </Grid>
                <Grid container xs={12} sx={{ marginBlockStart: 1 }}>
                    {esperandoRespuestaProtegerAPI || esperandoRespuestaGuardarAPI ? 
                        <Alert severity={"warning"} onClose={() => setMensajeProteger(null)}>Esperando respuesta de la API...</Alert>
                    :
                        mensajeProteger ? 
                            <Alert severity={mensajeProteger.tipo} onClose={() => setMensajeProteger(null)}>{mensajeProteger.mensaje}</Alert>
                        : null
                    } 
                </Grid>
                <Grid container sx={{ marginBlockStart: 2 }}>
                    <Grid item xs>
                        <Button variant="contained" size="small">
                            Archivo Original
                        </Button>
                        {proteccionActiva ? 
                            esperandoRespuestaProtegerAPI ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoProtegerOriginal ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoProtegerOriginalPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button onClick={paginaAnteriorOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button onClick={proximaPaginaOriginal} disabled={(!paginadoActivoOriginal) || (paginaActualOriginal == paginaLimiteOriginal)}>
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
                        {proteccionActiva ? 
                            <ForwardIcon fontSize="large" color="primary"/>
                        :
                            <ForwardIcon fontSize="large" color="disabled"/>
                        }
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" size="small" disabled={!proteccionActiva}>
                            Archivo Generado
                        </Button>
                        {proteccionActiva ? 
                            esperandoRespuestaProtegerAPI ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={""}
                                />
                            :
                                textoProtegerGenerado ? 
                                    <>
                                    <TextField multiline variant="outlined" disabled maxRows={20}
                                        sx={{ width: "100%" }}
                                        value={textoProtegerGeneradoPaginado}
                                    />
                                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                        <Grid item>
                                            <Button onClick={paginaAnteriorGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == 0)}>
                                                <ChevronLeft />
                                            </Button>
                                            <Button onClick={proximaPaginaGenerado} disabled={(!paginadoActivoGenerado) || (paginaActualGenerado == paginaLimiteGenerado)}>
                                                <ChevronRight />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    </>
                                :
                                    <TextField multiline variant="outlined" disabled maxRows={12}
                                        sx={{ width: "100%" }}
                                        value={"Procesando texto generado..."}
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

export default HammingProteger;
