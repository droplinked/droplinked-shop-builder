import React from 'react';

interface JsonLdScriptProps {
    data: any;
}

const JsonLdScript: React.FC<JsonLdScriptProps> = ({ data }) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
};

export default JsonLdScript;
