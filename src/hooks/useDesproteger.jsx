import { useContext } from 'react';
import DesprotegerContext from '../context/DesprotegerProvider';

const useDesproteger = () => {
    return useContext(DesprotegerContext);
};

export default useDesproteger;