import React from 'react';
import { motion, useInView } from 'framer-motion';

interface LazyLoadProps {
    children: React.ReactNode;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};
