import React, { useState} from 'react';
import { Box, Grid, Typography, Input, MenuItem, FormControl, Select, Button, AppBar,
    Checkbox, FormControlLabel, FormHelperText, TextField, Alert, Stack, Link } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
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
                </Stack>
            </AppBar>
        </Box>
        <Box sx={{ flexGrow: 1, marginBlock: 2, marginInline: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="secondary" sx={{textAlign: 'center'}}>
                        <b>DESPROTEGER</b>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        <b>Hamming</b>
                    </Typography>
                    <Typography variant="body1">
                        Breve descripción de el método de hamming...
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
                            textoDesprotegerOriginal ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={textoDesprotegerOriginal.substring(0,10000) + "..."}
                                />
                                
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
                            textoDesprotegerGenerado ? 
                                <TextField multiline variant="outlined" disabled maxRows={12}
                                    sx={{ width: "100%" }}
                                    value={textoDesprotegerGenerado.substring(0,10000) + "..."}
                                />
                                
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

export default HammingDesproteger;
