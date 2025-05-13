import { Badge, BadgeProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

/**
 * Badge component with different status styles and size variants
 * 
 * @param {object} props - Component props extending Chakra UI's BadgeProps
 * @param {string|number} props.text - Text content to display in the badge
 * @param {'neutral'|'pending'|'success'|'error'} [props.status='neutral'] - Visual status style of the badge
 * @param {'24'|'32'} [props.size='24'] - Size variant of the badge (height in pixels)
 * @param {ReactNode} [props.icon] - Optional icon to display before the text
 * 
 * @returns {JSX.Element} Styled badge component
 */
interface Props extends BadgeProps {
  text: string | number;
  status?: 'neutral' | 'pending' | 'success' | 'error';
  size?: '24' | '32';
  icon?: ReactNode;
}

function AppBadge({ text, status = 'neutral', size = '24', icon: Icon, ...props }: Props) {
  const styles = {
    status: {
      neutral: {
        borderColor: 'neutral.gray.600',
        bg: 'neutral.gray.800',
        color: 'neutral.white',
      },
      pending: {
        borderColor: 'system.link',
        bg: 'label.link',
        color: 'system.link',
      },
      success: {
        borderColor: 'main.primary',
        bg: 'label.primary',
        color: 'main.primary',
      },
      error: {
        borderColor: 'system.error',
        bg: 'label.errorBackground',
        color: 'system.error',
      },
    },
    size: {
      '24': {
        padding: '2px 12px',
        fontSize: '12px',
        gap: '8px',
      },
      '32': {
        padding: '6px 16px',
        fontSize: '14px',
        gap: '8px',
      },
    },
  } as const;

  return (
    <Badge
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      gap={styles.size[size].gap}
      border="1px solid"
      borderColor={styles.status[status].borderColor}
      borderRadius="24px"
      padding={styles.size[size].padding}
      bg={styles.status[status].bg}
      fontSize={styles.size[size].fontSize}
      fontWeight={400}
      textTransform="capitalize"
      color={styles.status[status].color}
      {...props}
    >
      {Icon}
      {text}
    </Badge>
  );
}

export default AppBadge;
