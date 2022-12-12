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
import React, {FC, useEffect, useMemo, useState} from 'react';
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
    isOpen: boolean;
    setIsAdditionalServiceModalOpen: (isOpen: boolean) => void;
}

export const AdditionalServiceModal: FC<Props> = ({ isOpen, setIsAdditionalServiceModalOpen}) => {
    const [newest, setNewest] = useState(0);
    const [between, setBetween] = useState(0);

    const closeModal = () => {
        setIsAdditionalServiceModalOpen(false);
    }

    const fetchBetween = async () => {
        return useFetch("GET", urls.betweenUrl)
    }

    const fetchNewest = async () => {
        return useFetch("GET", urls.newestUrl)
    }

    // @ts-ignore
    useEffect(async () => {
        const between = await fetchBetween();
        const newest = await fetchNewest();

        setBetween(between.data);
        setNewest(newest.data);
    }, [])

    console.log(1);

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay opacity='0.9' />
                <ModalContent
                    // mt='200px'
                    // d="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    // mb='0px'
                    bg={"#c1ffdf"}
                    minW='400px'
                    maxW='450px'
                    gap="20px"
                    d="flex"
                    h='auto'
                    position="absolute"
                    borderRadius="6px"
                    color={'#000000'}
                    p="20px 28px"
                    overflow="hidden"
                    right="8"
                    bottom="30"
                >
                    <ModalBody p="0" d="flex" justifyContent="space-between" margin="20px 0">
                        <Flex flexDir="column" alignItems="start" justifyContent="start">
                            <Flex mb="10px">
                                <Text textAlign="center">
                                    Length to newest city - <span style={{ color: "blueviolet"}}>300 km</span>
                                </Text>
                            </Flex>

                            <Flex>
                                <Text textAlign="center">
                                    Distance between max and min populated city - <span style={{ color: "blueviolet"}}>200 km</span>
                                </Text>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}
