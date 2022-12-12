import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Text, Button, useColorMode, Flex, Image, Icon, ButtonProps} from "@chakra-ui/react";
import {useFetch} from "../../hooks/useFetch";
// import {getCitiesFetch, getCity} from "../../api";
import {BsMoonStarsFill, BsQuestionCircle, BsSun} from "react-icons/bs";
import { TextInput } from "../../components/input/TextInput";
import { Form, Formik } from "formik";
import {CitiesContainer} from "../../pageBlocks/citiesContainer/CitiesContainer";
import {SettingsFormBlock} from "../../pageBlocks/settingsFormBlock/SettingsFormBlock";
import {AddCityModal} from "../../modals/AddCityModal";
import {AdditionalServiceModal} from "../../modals/AdditionalServiceModal";

export const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { colorMode, toggleColorMode, setColorMode } = useColorMode();

    useEffect(() => {
        setColorMode("dark");
    }, [])

    return (
            <Box>
                <Box
                    h={'auto'}
                    minH="100vh"
                    bgImage={colorMode === "dark" ? "url('./assets/new_back.jpg')" : "url('./assets/images.jpeg')"}
                    bgPosition="center"
                    backgroundRepeat="no-repeat"
                    color='#FFFFFF'
                    d="flex"
                    flexDir="column"
                    gridGap="30px"
                    p="20px"
                >
                    <Button
                        aria-label="Toggle Color Mode"
                        onClick={toggleColorMode}
                        _focus={{ boxShadow: 'none' }}
                        w="fit-content"
                        right="8px"
                        position="absolute"
                        top="15px"
                    >
                        {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
                    </Button>

                    <SettingsFormBlock />

                    <CitiesContainer />

                    <Icon as={BsQuestionCircle} pos={'absolute'} w={'32px'} h='32px' bottom='5' right='5' cursor="pointer" onClick={() => setIsOpen(true)}/>

                    {isOpen &&
                        <AdditionalServiceModal isOpen={isOpen} setIsAdditionalServiceModalOpen={setIsOpen} />
                    }
                </Box>
            </Box>
    )
}