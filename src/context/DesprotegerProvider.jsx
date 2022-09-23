import { useState, createContext, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import binaryStringToDecimal from '../helper/binaryStringToDecimal';

const DesprotegerContext = createContext();

const DesprotegerProvider = ({children}) =>  {
    // State
    const [mensajeDesproteger, setMensajeDesproteger] = useState(null);
    const [desproteccionActiva, setDesproteccionActiva] = useState(false);
    const [archivoDesproteger, setArchivoDesproteger] = useState(null);
    const [esperandoRespuestaDesproteger, setEsperandoRespuestaDesproteger] = useState(false);
    const [esperandoRespuestaGuardarAPI, setEsperandoRespuestaGuardarAPI] = useState(false);
    const [textoDesprotegerOriginal, setTextoDesprotegerOriginal] = useState(null);
    const [textoDesprotegerGenerado, setTextoDesprotegerGenerado] = useState(null);
    const [textoDesprotegerGeneradoBytes, setTextoDesprotegerGeneradoBytes] = useState(null);
    const [archivoDesprotegido, setArchivoDesprotegido] = useState(null);
    const [respuestaDesprotegerAPI, setRespuestaDesprotegerAPI] = useState(null);
   
    // useEffects
    useEffect(() => {
        if (archivoDesproteger) {
            /*
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setTextoDesprotegerOriginal(text);
            };
            reader.readAsText(archivoDesproteger);
            */
        }
    }, [archivoDesproteger]);

    useEffect(() => {
        if (respuestaDesprotegerAPI) {
            setTextoDesprotegerGeneradoBytes(respuestaDesprotegerAPI.TextoDesprotegerGeneradoBytes)
            setTextoDesprotegerGenerado(respuestaDesprotegerAPI.TextoDesprotegerGenerado);
            setTextoDesprotegerOriginal(respuestaDesprotegerAPI.TextoDesprotegerOriginal);
        }
    }, [respuestaDesprotegerAPI])

    useEffect(() => {
        let arreglo_decimales = [];
        let arreglo_binarios = [];
        /*
        if (archivoDesprotegido) {
            if (archivoDesprotegido.length > 0) {
                let contador_bits = 0;
                let string_acumulador = "";
                for (let i = 0; i < archivoDesprotegido.length; i++) {
                    if (archivoDesprotegido[i]) {
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
        
        obtenerTextoDesprotegido(arreglo_decimales);
        */
    }, [archivoDesprotegido]);

    // Funciones
    const desprotegerArchivo = async (modulo, nombre_archivo, corregir) => {
        try {
            setDesproteccionActiva(true);
            const respuesta = await clienteAxios.get(`/desprotegerHamming?modulo=${modulo}&file_name=${nombre_archivo}&corregir_error=${corregir}`);
            setEsperandoRespuestaDesproteger(false);
            setMensajeDesproteger({mensaje: `Se aplicó Hamming para desproteger el archivo "${nombre_archivo}" mediante módulos de ${modulo} bits. La API tardó ${respuesta.data.Tiempo.toFixed(4)} segundos.`, tipo: "info"});
            setRespuestaDesprotegerAPI(respuesta.data);
        } catch (error) {
            setEsperandoRespuestaDesproteger(false);
            setMensajeDesproteger({mensaje: "El archivo no pudo ser desprotegido.", tipo: "error"});
        }
    }

    const obtenerTextoDesprotegido = (arreglo_modulos_decimal) => {
        /*
        let textoGenerado = "";
        if (arreglo_modulos_decimal.length > 0) {
            for (let i = 0; i < arreglo_modulos_decimal.length; i++) {
                textoGenerado = textoGenerado + String.fromCharCode(arreglo_modulos_decimal[i]);
            }
            setTextoDesprotegerGenerado(textoGenerado);
        } else {
            setTextoDesprotegerGenerado("");
        }
        */
    }

    const resetearDesproteger = () => {
        setEsperandoRespuestaDesproteger(false);
        setMensajeDesproteger(null);
        setDesproteccionActiva(false);
        setTextoDesprotegerOriginal(null);
        setTextoDesprotegerGenerado(null);
        setArchivoDesprotegido(null);
    }

    const guardarArchivoDesprotegido = async (nombre_archivo) => {
        try {
            await clienteAxios.post(`/guardarTextoDesprotegido?file_name=${nombre_archivo}`, {textoDesprotegerGeneradoBytes});
            setEsperandoRespuestaGuardarAPI(false);
            setMensajeDesproteger({mensaje: "El archivo "+ nombre_archivo +" fue guardado con éxito!", tipo: "success"})
        } catch (error) {
            setEsperandoRespuestaDesproteger(false);
            setMensajeDesproteger({mensaje: "El archivo no se pudo guardar.", tipo: "error"})
        }
    }

    return (
        <DesprotegerContext.Provider
            value={{
                mensajeDesproteger,
                desproteccionActiva,
                textoDesprotegerOriginal,
                textoDesprotegerGenerado,
                esperandoRespuestaDesproteger,
                esperandoRespuestaGuardarAPI,
                desprotegerArchivo,
                setArchivoDesproteger,
                setMensajeDesproteger,
                resetearDesproteger,
                setArchivoDesprotegido,
                setEsperandoRespuestaDesproteger,
                setTextoDesprotegerGenerado,
                setTextoDesprotegerOriginal,
                guardarArchivoDesprotegido,
                setEsperandoRespuestaGuardarAPI
            }}
        >
            {children}
        </DesprotegerContext.Provider>
    )
};

export {
    DesprotegerProvider
};

export default DesprotegerContext;
