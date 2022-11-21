import { useState, createContext } from 'react';
import clienteAxios2 from '../config/clienteAxios2';

const DescompactarContext = createContext();

const DescompactarProvider = ({children}) =>  {
    // State
    const [mensajeDescompactar, setMensajeDescompactar] = useState(null);
    const [descompactacionActiva, setDescompactacionActiva] = useState(false);
    const [esperandoRespuestaDescompactarAPI, setEsperandoRespuestaDescompactarAPI] = useState(false);
    const [textoDescompactarOriginal, setTextoDescompactarOriginal] = useState(null);
    const [textoDescompactarGenerado, setTextoDescompactarGenerado] = useState(null);

    // Funciones
    const descompactarArchivo = async (archivo) => {
        try {
            // 'archivo' es el nombre del archivo con la extensión .txt
            const nombre_archivo = archivo.name.split('.')[0]; // en esta línea le saco la extensión y mando sólo el nombre a la API
            const respuesta = await clienteAxios2.post('/decompressHuffman', {file_name: nombre_archivo});
            setDescompactacionActiva(true);
            setEsperandoRespuestaDescompactarAPI(false);
            setMensajeDescompactar({mensaje: `Se aplicó Huffman para descompactar el archivo ${nombre_archivo}. La API tardó ${respuesta.data.time/1000} segundos.`, tipo: "info"});
        } catch (error) {
            setEsperandoRespuestaDescompactarAPI(false);
            setMensajeDescompactar({mensaje: "El archivo no pudo ser compactado.", tipo: "error"});
        }
    }

    const resetearDescompactar = () => {
        setEsperandoRespuestaDescompactarAPI(false);
        setMensajeDescompactar(null);
        setDescompactacionActiva(false);
        setTextoDescompactarOriginal("");
        setTextoDescompactarGenerado("");
    }

    return (
        <DescompactarContext.Provider
            value={{
                mensajeDescompactar,
                descompactacionActiva,
                textoDescompactarOriginal,
                textoDescompactarGenerado,
                esperandoRespuestaDescompactarAPI,
                descompactarArchivo,
                setMensajeDescompactar,
                resetearDescompactar,
                setEsperandoRespuestaDescompactarAPI,
                setTextoDescompactarOriginal,
                setTextoDescompactarGenerado
            }}
        >
            {children}
        </DescompactarContext.Provider>
    )
};

export {
    DescompactarProvider
};

export default DescompactarContext;
