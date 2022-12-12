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
import {AiOutlinePlus} from "react-icons/ai";
import {CloseIcon} from "../assets/svg/CloseIcon";
import {Form, Formik, FormikHelpers} from "formik";
import { useFetch } from "../hooks/useFetch";
import * as urls from "../api/urls";
import {CityType, GetParamsType} from "../types/types";
import {errorToast} from "../components/alerts/fail";
import {successToast} from "../components/alerts/success";
import {getCityFetch} from "../api";
import {AxiosResponse} from "axios";

type Props = {
    item: CityType;
    isOpen: boolean;
    onClose: () => void;
    params: GetParamsType;
    setCities: any;
    setCitiesCount: any;
}

export const DeleteCityModal: FC<Props> = ({ item, isOpen, onClose, setCities, setCitiesCount, params}) => {
    const closeModal = () => {
        onClose();
    }

    const getCities = async () => {
        const cities = await getCityFetch(params);

        setCities(cities?.data.cities);
        setCitiesCount(cities?.data.count);
    }

    const deleteCity = async (id: number) => {
        const res = await useFetch("DELETE", urls.deleteCity, `?cityId=${id}`)
        closeModal();
        // @ts-ignore
        await getCities();

        res?.status === 200 ? successToast(res?.data) : errorToast("can't delete city, try again please...");
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
                    minW='300px'
                    gap="20px"
                    d="flex"
                    h='auto'
                    borderRadius="6px"
                    color={'#000000'}
                    bg={'#FFFFFF'}
                    p="20px 28px"
                    overflow="hidden"
                >
                    <ModalHeader p="0" w="100%">
                        <Flex justifyContent="space-between">
                            <Text align='center' fontSize='22px' fontWeight="700">
                                Delete City
                            </Text>
                            <Box cursor="pointer" onClick={closeModal}>
                                <CloseIcon />
                            </Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody p="0" d="flex" justifyContent="center" m="20px">
                        <Text align='center' fontSize='18px' fontWeight="700">
                            Are you sure want to delete <span style={{ color: '#bd2121' }}>{item.name} city</span> with <span style={{ color: '#bd2121' }}>id={item.id}</span>?
                        </Text>
                    </ModalBody>
                    <ModalFooter p="0" d="flex" justifyContent="space-between" w="100%">
                        <Button
                            onClick={closeModal}
                            h="38px"
                            w='140px'
                            borderRadius="4px"
                            border={'1px solid #5C59EC'}
                            color="#5C59EC"
                            bg={'transparent'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "blue" }}
                            _hover={{
                                bg: 'blue.500',
                                color: 'white'
                            }}
                        >
                            <Text fontSize="14px">No</Text>
                        </Button>

                        <Button
                            onClick={() => deleteCity(item.id)}
                            h="38px"
                            w='140px'
                            borderRadius="4px"
                            bg={'red.500'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "red" }}
                            _hover={{
                                bg: 'red.400',
                            }}
                        >
                            <Text fontSize="14px" color="#FFF">Yes</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
