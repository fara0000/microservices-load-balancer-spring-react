import React, {FC, useState} from 'react';
import {
    Avatar,
    AvatarGroup,
    Box,
    Flex,
    Button,
    Icon,
    Image,
    Text,
    useColorModeValue, DarkMode, Badge, Divider,
} from "@chakra-ui/react";
// Assets
import {MdDeleteOutline, MdPeople, MdTimer, MdVideoLibrary} from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { BsArrowRight } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import {CityType} from "../../types/types";
import {getCityFetch} from "../../api";

export type Props = {
    name: string;
    item: CityType;
    creationDate: string;
    onOpen: () => void;
    setSelectedCity: (item: CityType) => void;
    setIsEditModalOpen: (isOpen: boolean) => void;
    setIsCityInfoModalOpen: (isOpen: boolean) => void;
}

export const CityCard: FC<Props> = ({
    name,
    item,
    creationDate,
    onOpen,
    setSelectedCity,
    setIsEditModalOpen,
    setIsCityInfoModalOpen,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let boxBg = useColorModeValue("white !important", "#2f9e85 !important");
    let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
    let mainText = useColorModeValue("gray.800", "white");
    let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
    let iconColor = useColorModeValue("brand.200", "white");

    return (
        <Flex
            borderRadius='20px'
            bg={boxBg}
            p='20px 20px 12px 20px'
            h='auto'
            w={{ base: "300px", md: "345px" }}
            alignItems='center'
            direction='column'>
            <Flex w='100%' mb='18px'>
                <Text
                    my='auto'
                    fontWeight='600'
                    color={mainText}
                    textAlign='center'
                    fontSize='xl'
                    me='auto'
                >
                    {name}
                </Text>
                <Icon
                    mt='1px'
                    w='22px'
                    h='22px'
                    as={CiEdit}
                    cursor="pointer"
                    color={iconColor}
                    onClick={() => {
                        setSelectedCity(item);
                        setIsEditModalOpen(true);
                    }}
                />
                <Icon
                    ml='5px'
                    w='22px'
                    h='22px'
                    as={MdDeleteOutline}
                    onClick={() => {
                        setSelectedCity(item);
                        onOpen();
                    }}
                    cursor="pointer"
                    color={iconColor}
                />
                {/*<Button*/}
                {/*    w='24px'*/}
                {/*    h='24px'*/}
                {/*    align='center'*/}
                {/*    justify='center'*/}
                {/*    borderRadius='12px'*/}
                {/*    bg={iconBox}*/}
                {/*>*/}
                {/*    <Icon*/}
                {/*        w='24px'*/}
                {/*        h='24px'*/}
                {/*        as={IoEllipsisHorizontalSharp}*/}
                {/*        color={iconColor}*/}
                {/*    />*/}
                {/*</Button>*/}
            </Flex>
            {/*<Text*/}
            {/*    fontWeight='600'*/}
            {/*    color={mainText}*/}
            {/*    textAlign='start'*/}
            {/*    fontSize='xl'*/}
            {/*    w='100%'>*/}
            {/*    Simmmple Web*/}
            {/*</Text>*/}
            <Divider orientation='horizontal' />
            <Flex justifyItems="space-between" width="100%" mt="8px">
                <Flex w="100%">
                    <Text
                        fontWeight='600'
                        color={mainText}
                        // textAlign='center'
                        fontSize='14px'
                        // me='auto'
                    >
                        Created:
                    </Text>
                    <Text
                        ml="5px"
                        fontWeight='600'
                        color={mainText}
                        // textAlign='center'
                        fontSize='14px'
                        // me='auto'
                    >
                        {creationDate}
                    </Text>
                </Flex>
                <Flex mt='auto' justify='flex-end' w='100%' align='center'>
                    <DarkMode>
                        <Text
                            borderRadius='9px'
                            fontSize="14px"
                            background="none"
                            color='#d5d020'
                            textAlign='center'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            cursor='pointer'
                            onClick={() => {
                                setSelectedCity(item);
                                setIsCityInfoModalOpen(true)
                            }}
                        >
                            Learn More
                            <Icon as={BsArrowRight} ml="5px"/>
                        </Text>
                    </DarkMode>
                </Flex>
            </Flex>
            {/*<Flex position="absolute" width: >*/}

            {/*</Flex>*/}
        </Flex>
    )
}
