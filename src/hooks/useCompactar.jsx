import { useContext } from 'react';
import CompactarContext from '../context/CompactarProvider';

const useCompactar = () => {
    return useContext(CompactarContext);
};

export default useCompactar;