import {
    Button,
    Divider,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text, Flex, Box, Input, Textarea, useDisclosure,
} from '@chakra-ui/react';
import React, {FC, useState} from 'react';
import { IconType } from 'react-icons/lib';
import { getChakraPortalProps } from '../core/chakra/chakraProvider';

interface ModalManualProps {
    value: any;
}

export const ModalManual: FC<ModalManualProps> = ({value}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let stringV = String({value})
    return (
        <Box>
            <Button
                onClick={onOpen}
                h="37px"
                w='222px'
                mr='27px'
                mt='24px'
                borderRadius="4px"
                bg={'#3047FE'}
                _focus={{ bg: "white.700" }}
                _active={{ bg: "blue" }}
                _hover={{
                    bg: 'blue.500',
                }}
            >
                <Text fontSize="14px">Поставить ставку</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay style={{opacity: '0.9'}} />
                <ModalContent
                    mt='100px'
                    w='519px'
                    h='458px'
                    borderRadius="4px"
                    color={'#FFFFFF'}
                    bg={'#050407'}
                >
                    <ModalHeader mt='26px' pb='0px'>
                        <Text align='center' fontSize='24px'> Согласшение о проведении процедуры котировочной сессии</Text>
                    </ModalHeader>
                    <ModalBody p='0px'>
                        <Flex justify="center" as="section" wrap="wrap">
                            <Flex>
                                <Box></Box>
                                <Text align='center' fontSize='14px'> Просим внимательно ознакомиться с условиями</Text>
                            </Flex>
                            <Box
                                ml='50px' mr='50px' mt='14px' w='419px' h='163px'
                                borderRadius="4px"
                                border='1px'
                                borderColor='#3047FE'
                            >
                                <Text w='300' mt='14px' ml='20px' mr='20px'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi
                                </Text>
                            </Box>
                            <Box mt='2px' w='222px' h='39px' mr='27'
                                 borderRadius="4px"
                                 borderColor='#3047FE'
                                 bg='#050407'
                            >
                                <Flex
                                    mt='10px'
                                    justify="center"
                                    border='1px'
                                    borderRadius="4px"
                                    borderColor={'#3047FE'}
                                >
                                    <Input
                                        pl='10px'
                                        color={'#3047FE'}
                                        mr='5px'
                                        fontSize='24px'
                                        variant='unstyled'
                                    >
                                    </Input>
                                    <Box mt='5px' color='#3047FE' h='24px'>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter mb='15px' pt='0px'>
                        <Button
                            onClick={onClose}
                            h="37px"
                            w='222px'
                            mr='27px'
                            mt='24px'
                            borderRadius="4px"
                            bg={'#3047FE'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "blue" }}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            <Text fontSize="14px">Принять условия</Text>
                        </Button>
                        <Button
                            onClick={onClose}
                            h="37px"
                            w='222px'
                            mr='27px'
                            mt='24px'
                            border='1px'
                            borderRadius="4px"
                            borderColor={'#3047FE'}
                            bg={'#050407'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "blue" }}
                            _hover={{
                                bg: '#3047FE',
                            }}
                        >
                            <Text fontSize="14px">Отклонить</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
