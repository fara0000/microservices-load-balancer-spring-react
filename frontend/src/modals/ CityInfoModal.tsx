import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import React, {FC, useEffect, useState} from 'react';
import {GrInfo} from "react-icons/gr";
import {CloseIcon} from "../assets/svg/CloseIcon";
// @ts-ignore
import {Form, Formik, FormikHelpers} from "formik";
import { useFetch } from "../hooks/useFetch";
import * as urls from "../api/urls";
import { CityType } from "../types/types";
import {errorToast} from "../components/alerts/fail";
import {successToast} from "../components/alerts/success";
import {getCityFetch} from "../api";
import {AxiosResponse} from "axios";

type Props = {
    item: CityType;
    isOpen: boolean;
    setIsCityInfoModalOpen: (isOpen: boolean) => void;
}

export const CityInfoModal: FC<Props> = ({ item, isOpen, setIsCityInfoModalOpen}) => {
    const closeModal = () => {
        setIsCityInfoModalOpen(false);
    }

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay opacity='0.4' />
                <ModalContent
                    mt='200px'
                    // d="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    mb='0px'
                    bg={"#c1ffdf"}
                    minW='500px'
                    gap="20px"
                    d="flex"
                    h='auto'
                    borderRadius="6px"
                    color={'#000000'}
                    p="20px 28px"
                    overflow="hidden"
                >
                    <ModalHeader p="0" w="100%">
                        <Flex justifyContent="space-between">
                            <Text align='center' fontSize='22px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                {item.name}
                            </Text>
                            <Box cursor="pointer" onClick={closeModal}>
                                <CloseIcon />
                            </Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody p="0" d="flex" justifyContent="space-between" margin="20px 0">
                        <Flex flexDir="column" alignItems="start">
                            <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                id - {item.id}
                            </Text>
                            <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                (x - {item.coordinates.x}, y - {item.coordinates.y})
                            </Text>
                            {item.area && <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                    area - {item.area}
                                </Text>
                            }
                            {item.climate &&
                                <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                    climate - {item.climate}
                                </Text>
                            }
                            {Boolean(item.metersAboveSeaLevel) &&
                                <Text align='start' fontSize='20px' fontWeight="700">
                                    {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                    Above sea level - {item.metersAboveSeaLevel}m
                                </Text>
                            }
                        </Flex>
                        <div>
                            <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                population - {item.population}
                            </Text>
                            <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                government - {item.government}
                            </Text>
                            <Text align='center' fontSize='20px' fontWeight="700">
                                {/*<Icon as={GrInfo} fill="yellow.500" />*/}
                                living standard - {item.standardOfLiving}
                            </Text>
                        </div>
                    </ModalBody>
                    <ModalFooter p="0" d="flex" justifyContent="end" w="100%">
                        <Button
                            onClick={closeModal}
                            h="38px"
                            w='140px'
                            borderRadius="4px"
                            bg={'blue.500'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "blue" }}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            <Text fontSize="14px" color="#FFF">OK</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
