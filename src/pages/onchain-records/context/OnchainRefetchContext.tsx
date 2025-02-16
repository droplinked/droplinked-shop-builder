import React, { createContext, useContext } from 'react';

interface OnchainRefetchContextType {
    refetch: () => void;
}

const OnchainRefetchContext = createContext<OnchainRefetchContextType | undefined>(undefined);

export const useOnchainRefetch = () => {
    const context = useContext(OnchainRefetchContext);
    if (!context) {
        throw new Error('useOnchainRefetch must be used within an OnchainRefetchProvider');
    }
    return context;
};

export const OnchainRefetchProvider: React.FC<{ children: React.ReactNode; refetch: () => void }> = ({ children, refetch }) => {
    return (
        <OnchainRefetchContext.Provider value={{ refetch }}>
            {children}
        </OnchainRefetchContext.Provider>
    );
};
