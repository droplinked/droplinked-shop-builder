import React from 'react';

interface JsonLdScriptProps {
    data: any;
}

const JsonLdScript: React.FC<JsonLdScriptProps> = ({ data }) => {
    return (
        <script type="application/ld+json">
            {JSON.stringify(data)}
        </script>
    );
};

export default JsonLdScript;
