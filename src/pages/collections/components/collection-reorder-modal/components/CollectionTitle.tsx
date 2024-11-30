
import React from 'react';
import AppTypography from 'components/common/typography/AppTypography';

function CollectionTitle({ title }: { title: string }) {
    return (
        <AppTypography fontSize={16} fontWeight={500} color={"#c2c2c2"}>
            {title}
        </AppTypography>
    );
}

export default CollectionTitle;