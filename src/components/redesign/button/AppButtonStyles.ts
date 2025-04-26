/**
 * Button component styles
 * Organized following CSS box model principles
 */

const styles = {
  variant: {
    normal: {
      default: {
        background: 'transparent',
        borderColor: 'transparent',
        color: 'text.primary',
      },
      hover: {
        background: 'button.hover.transparent',
        borderColor: 'transparent',
        color: 'text.primary',
      },
      pressed: {
        background: 'button.pressed.transparent',
        borderColor: 'transparent',
        color: 'text.primary',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: 'text.disabled.dark',
      },
    },
    filled: {
      default: {
        background: 'button.default.primary',
        borderColor: 'transparent',
        color: 'black',
      },
      hover: {
        background: 'button.hover.filled',
        borderColor: 'transparent',
        color: 'black',
      },
      pressed: {
        background: 'button.pressed.filled',
        borderColor: 'transparent',
        color: 'black',
      },
      disabled: {
        background: 'button.disable.dark',
        borderColor: 'transparent',
        color: 'text.disabled.dark',
      },
    },
    outlined: {
      default: {
        background: 'transparent',
        borderColor: 'primary.default',
        color: 'primary.default',
      },
      hover: {
        background: 'button.hover.transparent',
        borderColor: 'button.default.primary',
        color: 'text.primary',
      },
      pressed: {
        background: 'button.pressed.transparent',
        borderColor: 'button.default.primary',
        color: 'primary.700',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'button.disable.dark',
        color: 'text.disabled.dark',
      },
    },
    secondary: {
      default: {
        background: 'button.default.secondary',
        borderColor: 'transparent',
        color: 'neutral.white',
      },
      hover: {
        background: 'button.hover.secondary',
        borderColor: 'transparent',
        color: 'neutral.white',
      },
      pressed: {
        background: 'button.pressed.secondary',
        borderColor: 'transparent',
        color: 'neutral.white',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: 'transparent',
      },
    },
  },
  size: {
    sm: {
      height: '32px',
      borderRadius: '4px',
      fontSize: '14px',
      lineHeight: '16px',
      gap: '4px',
    },
    md: {
      height: '40px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '20px',
      gap: '6px',
    },
    lg: {
      height: '48px',
      borderRadius: '8px',
      fontSize: '16px',
      lineHeight: '24px',
      gap: '8px',
    },
  },
} as const;

export default styles;