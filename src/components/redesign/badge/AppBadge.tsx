import { Badge, BadgeProps, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

interface Iprops extends BadgeProps {
  text: string | number;
  status?: 'neutral' | 'pending' | 'success' | 'error';
  size?: '24' | '32';
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function AppBadge({ text, status = 'neutral', size = '24', icon: Icon, ...props }: Iprops) {
  const styles = useMemo(
    () => ({
      status: {
        neutral: {
          border: '1px solid',
          borderColor: 'neutral.gray.600',
          bg: 'neutral.gray.800',
          color: 'neutral.white'
        },
        pending: {
          border: '1px solid',
          borderColor: 'system.link',
          bg: 'label.link',
          color: 'system.link'
        },
        success: {
          border: '1px solid',
          borderColor: 'primary.default',
          bg: 'label.success',
          color: 'primary.default'
        },
        error: {
          border: '1px solid',
          borderColor: 'system.error',
          bg: 'label.error',
          color: 'system.error'
        }
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
          gap: '8px'
        }
      }
    }),
    []
  );

  return (
    <Badge
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      gap={styles.size[size].gap}
      padding={styles.size[size].padding}
      borderRadius="24px"
      border={styles.status[status].border}
      borderColor={styles.status[status].borderColor}
      bg={styles.status[status].bg}
      {...props}
    >
      {Icon && <Icon />}
      <Text fontWeight={400} fontSize={styles.size[size].fontSize} color={styles.status[status].color}>
        {text}
      </Text>
    </Badge>
  );
}

export default AppBadge;
