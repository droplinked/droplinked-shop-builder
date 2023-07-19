import React, { ComponentType, FC } from 'react';
import AdminGate from './parts/gate/AdminGate';
import AdminProvider from './parts/provider/AdminProvider';

function AdminHoc<TProps>(WrappedComponent: ComponentType<TProps>): FC<TProps> {
    const WithLoading: FC<TProps> = ({ ...props }) => {
        return (
            <AdminGate>
                <AdminProvider>
                    <WrappedComponent {...props as TProps} />
                </AdminProvider>
            </AdminGate>
        )
    };

    return WithLoading;
}

export default AdminHoc;