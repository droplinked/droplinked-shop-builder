import React from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from 'hooks/intersection-observer/useIntersectionObserver'

interface LazyLoadProps {
    children: React.ReactNode
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ children }) => {
    const [isInView, setIsInView] = React.useState(false)
    const ref = useIntersectionObserver<HTMLDivElement>(() => {
        setIsInView(true)
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}
