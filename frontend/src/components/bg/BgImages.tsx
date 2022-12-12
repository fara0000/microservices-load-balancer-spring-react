import React, { FC } from 'react';
import { chakra } from '@chakra-ui/react';
import './index.css';

export const BackgroundImages: FC = () => (
    <chakra.span zIndex={2} position={'absolute'} w={'100%'} overflow={'hidden'} minH={'100%'}>
        <chakra.span className="bg-img" display={{ base: 'none', sm: 'block' }} />
    </chakra.span>
);