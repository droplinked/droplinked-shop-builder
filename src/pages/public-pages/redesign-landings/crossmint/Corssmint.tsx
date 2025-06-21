import React from 'react'

export default function Corssmint() {
    const sections = [];

    return (
        <>
            {sections.map((section) => (
                // <LazyLoad key={section.id}>
                section.component
                // </LazyLoad>
            ))}
        </>
    )
}
