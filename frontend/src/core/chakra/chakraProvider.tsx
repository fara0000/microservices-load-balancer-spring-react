import React, { FC } from 'react';

import { Box, ChakraProvider as ThemeProvider, PortalProps } from '@chakra-ui/react';
import chakraTheme from './chakraTheme';

// @ts-ignore
export const ChakraProvider: FC = ({ children }) => (
    <ThemeProvider theme={chakraTheme}>
        <Box id="react-root-node">
            {children}
        </Box>
    </ThemeProvider>
);

export function getChakraPortalProps(): Pick<PortalProps, 'appendToParentPortal' | 'containerRef'> {
    return {
        containerRef: { current: document.querySelector('#react-root-node') },
    };
}