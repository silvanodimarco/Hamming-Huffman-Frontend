import { useContext } from 'react';
import DescompactarContext from '../context/DescompactarProvider';

const useDescompactar = () => {
    return useContext(DescompactarContext);
};

export default useDescompactar;