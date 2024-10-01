import React from 'react'
import D3AboveTheFoldSection from './components/d3-above-the-fold/D3AboveTheFoldSection'
import D3CollaborationDetails from './components/D3CollaborationDetails'
import D3CollaborationFeatures from './components/D3CollaborationFeatures'
import D3Layout from './components/D3Layout'

function D3Page() {
    return (
        <>
            <D3AboveTheFoldSection />
            <D3Layout>
                <D3CollaborationDetails />
                <D3CollaborationFeatures />
            </D3Layout>
        </>
    )
}

export default D3Page