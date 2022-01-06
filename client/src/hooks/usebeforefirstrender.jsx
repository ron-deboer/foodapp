import { useRef } from 'react';

const useBeforeFirstRender = (cb) => {
    const firstRender = useRef(true);
    if (firstRender.current) {
        cb();
    }

    firstRender.current = false;
};
export default useBeforeFirstRender;
