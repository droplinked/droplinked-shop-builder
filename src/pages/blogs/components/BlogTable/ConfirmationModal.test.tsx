import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ConfirmationModal from './ConfirmationModal'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        ModalFooter: ({ children, ...rest }) =>
            React.createElement('div', { 'data-testid': 'modal-footer', ...rest }, children)
    }
})

jest.mock('components/redesign/modal/AppModal', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ children, modalRootProps }) =>
            React.createElement(
                'div',
                { 'data-testid': 'app-modal', 'data-isopen': modalRootProps.isOpen },
                children
            )
    }
})

jest.mock('components/redesign/modal/ModalHeaderData', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ icon, title, description }) =>
            React.createElement(
                'div',
                { 'data-testid': 'modal-header-data' },
                icon,
                React.createElement('h1', null, title),
                React.createElement('p', null, description)
            )
    }
})

jest.mock('components/redesign/button/AppButton', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ children, isDisabled, isLoading, onClick, variant }) =>
            React.createElement(
                'button',
                {
                    'data-testid': variant === 'secondary' ? 'cancel-button' : 'confirm-button',
                    disabled: isDisabled,
                    'data-loading': isLoading,
                    onClick
                },
                children
            )
    }
})

describe('ConfirmationModal', () => {
    const icon = <svg data-testid='test-icon' />
    const title = 'Confirm Delete'
    const description = 'Are you sure you want to delete this item?'
    const onClose = jest.fn()
    const onConfirm = jest.fn()
    const confirmButtonProps = { isLoading: false, onClick: onConfirm, children: 'Delete' }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders when isOpen=true with header data and both buttons', () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={onClose}
                icon={icon}
                title={title}
                description={description}
                confirmButtonProps={confirmButtonProps}
            />
        )
        const modal = screen.getByTestId('app-modal')
        expect(modal).toHaveAttribute('data-isopen', 'true')

        expect(screen.getByTestId('modal-header-data')).toBeInTheDocument()
        expect(screen.getByTestId('test-icon')).toBeInTheDocument()
        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.getByText(description)).toBeInTheDocument()

        const cancelBtn = screen.getByTestId('cancel-button')
        expect(cancelBtn).toHaveTextContent('Cancel')
        const confirmBtn = screen.getByTestId('confirm-button')
        expect(confirmBtn).toHaveTextContent('Delete')
    })

    it('calls onClose when Cancel is clicked', async () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={onClose}
                icon={icon}
                title={title}
                description={description}
                confirmButtonProps={confirmButtonProps}
            />
        )
        await userEvent.click(screen.getByTestId('cancel-button'))
        expect(onClose).toHaveBeenCalled()
    })

    it('calls confirmButtonProps.onClick when Delete is clicked', async () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={onClose}
                icon={icon}
                title={title}
                description={description}
                confirmButtonProps={confirmButtonProps}
            />
        )
        await userEvent.click(screen.getByTestId('confirm-button'))
        expect(onConfirm).toHaveBeenCalled()
    })

    it('disables both buttons when isLoading=true', () => {
        render(
            <ConfirmationModal
                isOpen={true}
                onClose={onClose}
                icon={icon}
                title={title}
                description={description}
                confirmButtonProps={{ ...confirmButtonProps, isLoading: true }}
            />
        )
        expect(screen.getByTestId('cancel-button')).toBeDisabled()
        expect(screen.getByTestId('confirm-button')).toBeDisabled()
        expect(screen.getByTestId('confirm-button')).toHaveAttribute('data-loading', 'true')
    })

    it('renders hidden when isOpen=false', () => {
        render(
            <ConfirmationModal
                isOpen={false}
                onClose={onClose}
                icon={icon}
                title={title}
                description={description}
                confirmButtonProps={confirmButtonProps}
            />
        )
        expect(screen.getByTestId('app-modal')).toHaveAttribute('data-isopen', 'false')
    })
})
