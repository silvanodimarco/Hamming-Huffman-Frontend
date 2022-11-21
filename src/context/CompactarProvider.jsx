import { useState, createContext } from 'react';
import clienteAxios2 from '../config/clienteAxios2';

const CompactarContext = createContext();

const CompactarProvider = ({children}) =>  {
    // State
    const [mensajeCompactar, setMensajeCompactar] = useState(null);
    const [compactacionActiva, setCompactacionActiva] = useState(false);
    const [esperandoRespuestaCompactarAPI, setEsperandoRespuestaCompactarAPI] = useState(false);
    const [textoCompactarOriginal, setTextoCompactarOriginal] = useState(null);
    const [textoCompactarGenerado, setTextoCompactarGenerado] = useState(null);

    // Funciones
    const compactarArchivo = async (archivo) => {
        try {
            // 'archivo' es el nombre del archivo con la extensión .txt
            const nombre_archivo = archivo.name.split('.')[0]; // en esta línea le saco la extensión y mando sólo el nombre a la API
            const respuesta = await clienteAxios2.post('/compressHuffman', {file_name: nombre_archivo});
            setCompactacionActiva(true);
            setEsperandoRespuestaCompactarAPI(false);
            setMensajeCompactar({mensaje: `Se aplicó Huffman para compactar el archivo ${nombre_archivo}. La API tardó ${respuesta.data.time_elapsed/1000} segundos y el porcentaje de compresión fue ${respuesta.data.compress_percent*100}%.`, tipo: "info"});
        } catch (error) {
            setEsperandoRespuestaCompactarAPI(false);
            setMensajeCompactar({mensaje: "El archivo no pudo ser compactado.", tipo: "error"});
        }
    }

    const resetearCompactar = () => {
        setEsperandoRespuestaCompactarAPI(false);
        setMensajeCompactar(null);
        setCompactacionActiva(false);
        setTextoCompactarOriginal("");
        setTextoCompactarGenerado("");
    }

    return (
        <CompactarContext.Provider
            value={{
                mensajeCompactar,
                compactacionActiva,
                textoCompactarOriginal,
                textoCompactarGenerado,
                esperandoRespuestaCompactarAPI,
                compactarArchivo,
                setMensajeCompactar,
                resetearCompactar,
                setEsperandoRespuestaCompactarAPI,
                setTextoCompactarOriginal,
                setTextoCompactarGenerado
            }}
        >
            {children}
        </CompactarContext.Provider>
    )
};

export {
    CompactarProvider
};

export default CompactarContext;
