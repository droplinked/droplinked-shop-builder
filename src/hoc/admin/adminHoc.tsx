import React, { ComponentType, FC } from 'react';
import AdminGate from './parts/gate/AdminGate';
import DataSyncAdmin from './parts/syncData/DataSyncAdmin';

function AdminHoc<TProps>(WrappedComponent: ComponentType<TProps>): FC<TProps> {
    const WithLoading: FC<TProps> = ({ ...props }) => {
        return (
            <AdminGate>
                <DataSyncAdmin>
                    <WrappedComponent {...props as TProps} />
                </DataSyncAdmin>
            </AdminGate>
        )
    };

    return WithLoading;
}

export default AdminHoc;