import React, { ComponentType, FC } from 'react';
import AdminGate from './parts/gate/AdminGate';

function AdminHoc<TProps>(WrappedComponent: ComponentType<TProps>): FC<TProps> {
    const WithLoading: FC<TProps> = ({ ...props }) => {
        return (
            <AdminGate>
                <WrappedComponent {...props as TProps} />
            </AdminGate>
        )
    };

    return WithLoading;
}

export default AdminHoc;