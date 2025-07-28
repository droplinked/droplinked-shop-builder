import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React, { PropsWithChildren } from 'react'

function TemplateCardLayout({ children }: PropsWithChildren) {
    return (
        <RuledGrid
            columns={1}
            height="100%"
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={16}
            overflow="hidden"
            __css={{
                '.title': {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'text.white'
                },
                '.subtitle': {
                    fontSize: '14px',
                    color: 'text.subtext.placeholder.dark'
                },
                '.content': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flex: 1
                },
                '.template-image': {
                    width: '100%',
                    height: {
                        base: '180px',
                        md: '190px',
                        lg: '260px',
                        xl: '164px',
                        '2xl': '190px',
                        '3xl': '206px'
                    },
                    objectFit: 'cover'
                }
            }}
        >
            {children}
        </RuledGrid>
    )
}

export default TemplateCardLayout
