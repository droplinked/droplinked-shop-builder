const PrintfulModel = ({
    uniqe: (data) => {
        const uniqueData = [];
        const duplicates = [];
        data.forEach((obj) => {
            if (!duplicates.includes(obj.value)) {
                duplicates.push(obj.value);
                uniqueData.push(obj);
            }
        });

        return uniqueData
    },

    styles: ({
        variables: {
            '--pf-sys-background': '#242424',
            '--pf-sys-neutral-surface-50': '#242424',
            '--pf-sys-neutral-300-on-background': '#64748b',
            '--pf-sys-neutral-400-on-background': '#94a3b8',
            '--pf-sys-neutral-700-on-background': '#e2e8f0',
            '--pf-sys-neutral-800-on-background': '#f1f5f9',
            '--pf-comp-banner-warning-surface': '#333',
            '--pf-sys-neutral-900-on-background': '#C2C2C2',
            '--pf-sys-primary-400-on-background': '#059669',
            '--pf-sys-primary-700-on-background': '#6ee7b7',
            '--pf-comp-designer-area-action-buttons-container-surface': '#333',
            '--pf-sys-border-on-background': '#64748b',
            '--pf-sys-link-on-background': '#93c5fd',
            '--pf-comp-designer-mockup-area-surface': "#f1f5f9",
            '--pf-sys-icon-on-background': '#94a3b8',
            '--pf-sys-icon-info-on-background': '#94a3b8',
            '--pf-sys-icon-hover-neutral-700-on-background': '#e2e8f0',
            '--pf-sys-icon-hover-neutral-900-on-background': '#C2C2C2',
            '--pf-sys-error-on-background': '#f87171',
            '--pf-sys-success-on-background': '#22c55e',
            '--pf-sys-warning-on-background': '#fcd34d',
            '--pf-sys-hover-border-color-on-background': '#64748b',
            '--pf-sys-hover-box-shadow-on-background': '',
            '--pf-sys-neutral-surface-50-hsl': '217.24, 32.58%, 17.45%',
            '--pf-sys-neutral-300-on-surface-50': '#64748b',
            '--pf-sys-neutral-400-on-surface-50': '#94a3b8',
            '--pf-sys-neutral-700-on-surface-50': '#e2e8f0',
            '--pf-sys-neutral-900-on-surface-50': '#C2C2C2',
            '--pf-sys-neutral-surface-100': '#334155',
            '--pf-sys-neutral-700-on-surface-100': '#e2e8f0',
            '--pf-sys-neutral-900-on-surface-100': '#C2C2C2',
            '--pf-sys-neutral-surface-200': '#475569',
            '--pf-sys-neutral-400-on-surface-200': '#94a3b8',
            '--pf-sys-neutral-900-on-surface-200': '#C2C2C2',
            '--pf-sys-neutral-surface-300': '#64748b',
            '--pf-sys-neutral-400-on-surface-300': '#94a3b8',
            '--pf-sys-neutral-900-on-surface-300': '#C2C2C2',
            '--pf-sys-neutral-surface-400': '#94a3b8',
            '--pf-sys-neutral-900-on-surface-400': '#C2C2C2',
            '--pf-sys-primary-surface-400': '#059669',
            '--pf-sys-primary-surface-700': '#6ee7b7',
            '--pf-sys-primary-on-surface-700': '#134e4a',
            '--pf-sys-error-surface': '#991b1b',
            '--pf-sys-error-on-surface': '#fef2f2',
            '--pf-sys-form-control-indicator-active-surface': '#93c5fd',
            '--pf-sys-form-control-indicator-active-on-surface': '#1e3a8a',
            '--pf-sys-action-button-surface': '',
            '--pf-sys-action-button-on-surface': '#C2C2C2',
            '--pf-sys-action-button-hover-surface': '#64748b',
            '--pf-sys-action-button-hover-on-surface': '#C2C2C2',
            '--pf-sys-action-button-focus-surface': '',
            '--pf-sys-action-button-focus-on-surface': '#C2C2C2',
            '--pf-sys-action-button-selected-surface': '#155e75',
            '--pf-sys-action-button-selected-on-surface': '#ecfeff',
            '--pf-sys-action-button-disabled-surface': '',
            '--pf-sys-action-button-disabled-on-surface': '#94a3b8',
            '--pf-comp-modal-surface': '#242424',
            '--pf-comp-popover-on-surface': '#242424',
        },
    })
})

export default PrintfulModel