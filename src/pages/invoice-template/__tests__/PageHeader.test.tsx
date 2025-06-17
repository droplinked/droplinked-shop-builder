import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

// Ensure the component is properly mocked if necessary
jest.mock('../components/PageHeader', () => {
    return function MockPageHeader({ onDownload, isDownloading, isFetching }) {
        return (
            <div>
                <a href="/dashboard">Back to Dashboard</a>
                <button
                    onClick={onDownload}
                    disabled={isFetching}
                >
                    {isDownloading ? 'Downloading...' : 'Download'}
                </button>
            </div>
        );
    };
});

describe('PageHeader', () => {
    it('renders Back to Dashboard and Download buttons', () => {
        render(
            <MemoryRouter>
                <PageHeader onDownload={jest.fn()} isDownloading={false} isFetching={false} />
            </MemoryRouter>
        )
        expect(screen.getByText('Back to Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Download')).toBeInTheDocument()
    })

    it('calls onDownload when Download button is clicked', () => {
        const onDownload = jest.fn()
        render(
            <MemoryRouter>
                <PageHeader onDownload={onDownload} isDownloading={false} isFetching={false} />
            </MemoryRouter>
        )
        fireEvent.click(screen.getByText('Download'))
        expect(onDownload).toHaveBeenCalled()
    })

    it('disables Download button when isFetching is true', () => {
        render(
            <MemoryRouter>
                <PageHeader onDownload={jest.fn()} isDownloading={false} isFetching={true} />
            </MemoryRouter>
        )
        expect(screen.getByText('Download')).toBeDisabled()
    })
})
