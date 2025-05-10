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
      },
      pressed: {
        background: 'button.pressed.transparent',
      },
      disabled: {
        background: 'transparent',
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
      },
      pressed: {
        background: 'button.pressed.filled',
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
        borderColor: 'main.primary',
        color: 'main.primary',
      },
      hover: {
        background: 'button.hover.transparent',
      },
      pressed: {
        background: 'button.pressed.transparent',
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
      },
      pressed: {
        background: 'button.pressed.secondary',
      },
      disabled: {
        background: 'button.disable.dark',
        borderColor: 'button.disable.dark',
        color: 'text.disabled.dark',
      },
    },
  },
  size: {
    sm: {
      height: '32px',
      borderRadius: '4px',
      fontSize: '12px',
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

/**
 * Helper functions
 */
const helpers = {
  /**
   * Gets variant and size styles with fallback to defaults
   */
  getStyles(variant: string, size: string) {
    // Validate variant and size
    const validVariant = variant in styles.variant ? variant : 'filled';
    const validSize = size in styles.size ? size : 'md';
    
    // Get style objects
    const variantStyle = styles.variant[validVariant as keyof typeof styles.variant];
    const sizeStyle = styles.size[validSize as keyof typeof styles.size];
    
    return { variantStyle, sizeStyle };
  },
  
  /**
   * Gets state-specific style properties with safe fallbacks
   */
  getStateStyles(variantStyle: any, isDisabled: boolean) {
    const stateObj = isDisabled ? variantStyle.disabled : variantStyle.default;
    
    return {
      borderColor: 'borderColor' in stateObj ? stateObj.borderColor : 'transparent',
      background: 'background' in stateObj ? stateObj.background : 'transparent',
      color: 'color' in stateObj ? stateObj.color : 'text.primary',
      hover: !isDisabled && variantStyle.hover ? variantStyle.hover : {},
      active: !isDisabled && variantStyle.pressed ? variantStyle.pressed : {},
    };
  },
  
  /**
   * Gets icon styling for consistency
   */
  getIconStyling() {
    return {
      'svg': {
        stroke: 'currentColor',
        fill: 'none',
        path: {
          stroke: 'currentColor',
        }
      }
    };
  }
};

// Create a const object before exporting to fix the linting error
const buttonStyleUtils = { styles, helpers };
export default buttonStyleUtils;