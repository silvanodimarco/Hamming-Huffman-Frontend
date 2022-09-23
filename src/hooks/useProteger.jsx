import { useContext } from 'react';
import ProtegerContext from '../context/ProtegerProvider';

const useProteger = () => {
    return useContext(ProtegerContext);
};

export default useProteger;