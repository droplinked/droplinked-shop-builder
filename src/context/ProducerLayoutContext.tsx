import { useBreakpointValue } from '@chakra-ui/react'
import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ProducerLayoutContextType {
    isSidebarOpen: boolean
    toggleSidebar: () => void
    breakpoint: string
}

const ProducerLayoutContext = createContext<ProducerLayoutContextType | undefined>(undefined)

export const ProducerLayoutProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const breakpoint = useBreakpointValue({ base: 'mobile', md: 'tablet', xl: 'desktop' })

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

    return (
        <ProducerLayoutContext.Provider value={{ isSidebarOpen, toggleSidebar, breakpoint }}>
            {children}
        </ProducerLayoutContext.Provider>
    )
}

export const useProducerLayout = () => {
    const context = useContext(ProducerLayoutContext)
    if (!context) throw new Error('useProducerLayout must be used within ProducerLayoutProvider')
    return context
}