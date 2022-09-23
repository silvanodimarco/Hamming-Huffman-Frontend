import { useState, createContext, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import moduleToDecimalArray from '../helper/moduleToDecimalArray';

const ProtegerContext = createContext();

const ProtegerProvider = ({children}) =>  {
    // State
    const [mensajeProteger, setMensajeProteger] = useState(null);
    const [proteccionActiva, setProteccionActiva] = useState(false);
    const [archivoProteger, setArchivoProteger] = useState(null);
    const [esperandoRespuestaProtegerAPI, setEsperandoRespuestaProtegerAPI] = useState(false);
    const [esperandoRespuestaGuardarAPI, setEsperandoRespuestaGuardarAPI] = useState(false);
    const [textoProtegerOriginal, setTextoProtegerOriginal] = useState(null);
    const [textoProtegerGenerado, setTextoProtegerGenerado] = useState(null);
    const [textoProtegerGeneradoBytes, setTextoProtegerGeneradoBytes] = useState(null);
    const [archivoProtegido, setArchivoProtegido] = useState(null);
    const [respuestaProtegerAPI, setRespuestaProtegerAPI] = useState(null);
   
    // useEffects
    useEffect(() => {
        if (archivoProteger) {
            /*
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                setTextoProtegerOriginal(text);
            };
            reader.readAsText(archivoProteger);
            */
        }
    }, [archivoProteger]);

    useEffect(() => {
        if (respuestaProtegerAPI) {
            setTextoProtegerGeneradoBytes(respuestaProtegerAPI.TextoProtegerGeneradoBytes);
            setTextoProtegerGenerado(respuestaProtegerAPI.TextoProtegerGenerado);
            setTextoProtegerOriginal(respuestaProtegerAPI.TextoProtegerOriginal);
        }
    }, [respuestaProtegerAPI])

    useEffect(() => {
        /*
        let arreglo_decimales = []
        let arreglo_binarios = []
        if (archivoProtegido) {
            let respuesta = []
            if (archivoProtegido) {
                let cantidad_modulos = archivoProtegido.length;
                for (let i = 0; i < cantidad_modulos; i++) {
                    respuesta = moduleToDecimalArray(archivoProtegido[i])
                    arreglo_binarios.push(respuesta[0]);
                    arreglo_decimales.push(respuesta[1]);
                }
            }
        }
        obtenerTextoProtegido(arreglo_decimales);
        */
    }, [archivoProtegido]);

    // Funciones
    const protegerArchivo = async (modulo, nombre_archivo, error) => {
        try {
            setProteccionActiva(true);
            const respuesta = await clienteAxios.get(`/protegerHamming?modulo=${modulo}&file_name=${nombre_archivo}&introducir_error=${error}`);
            setEsperandoRespuestaProtegerAPI(false);
            setMensajeProteger({mensaje: `Se aplicó Hamming para proteger el archivo "${nombre_archivo}" mediante módulos de ${modulo} bits. La API tardó ${respuesta.data.Tiempo.toFixed(4)} segundos.`, tipo: "info"});
            setRespuestaProtegerAPI(respuesta.data);
        } catch (error) {
            setEsperandoRespuestaProtegerAPI(false);
            setMensajeProteger({mensaje: "El archivo no pudo ser protegido.", tipo: "error"});
        }
    }

    const resetearProteger = () => {
        setEsperandoRespuestaProtegerAPI(false);
        setMensajeProteger(null);
        setProteccionActiva(false);
        setTextoProtegerOriginal(null);
        setTextoProtegerGenerado(null);
        setArchivoProtegido(null);
    }

    const guardarArchivoProtegido = async (nombre_archivo) => {
        try {
            await clienteAxios.post(`/saveFile?file_name=${nombre_archivo}`, {textoProtegerGeneradoBytes});
            setEsperandoRespuestaGuardarAPI(false);
            setMensajeProteger({mensaje: "El archivo "+ nombre_archivo +" fue guardado con éxito!", tipo: "success"})
        } catch (error) {
            setEsperandoRespuestaProtegerAPI(false);
            setMensajeProteger({mensaje: "El archivo no se pudo guardar.", tipo: "error"})
        }
    }

    return (
        <ProtegerContext.Provider
            value={{
                mensajeProteger,
                proteccionActiva,
                textoProtegerOriginal,
                textoProtegerGenerado,
                esperandoRespuestaProtegerAPI,
                esperandoRespuestaGuardarAPI,
                protegerArchivo,
                setArchivoProteger,
                setMensajeProteger,
                resetearProteger,
                setEsperandoRespuestaProtegerAPI,
                setEsperandoRespuestaGuardarAPI,
                guardarArchivoProtegido
            }}
        >
            {children}
        </ProtegerContext.Provider>
    )
};

export {
    ProtegerProvider
};

export default ProtegerContext;
