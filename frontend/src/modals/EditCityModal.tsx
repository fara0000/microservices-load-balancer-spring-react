import {
    Box,
    Flex,
    Icon,
    Text,
    Modal,
    Button,
    Divider,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import React, {FC, useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {CloseIcon} from "../assets/svg/CloseIcon";
import {Form, Formik, FormikHelpers} from "formik";
import {TextInput} from "../components/input/TextInput";
import {SelectField} from "../components/select";
import {ClimateTypes, GovernmentTypes, LivingStandardTypes} from "../types/enums";
import { useFetch } from "../hooks/useFetch";
import * as urls from "../api/urls";
import {CityType, CoordinatesType, GetParamsType, HumanType} from "../types/types";
import * as Yup from 'yup';
import {getCityFetch} from "../api";
import {successToast} from "../components/alerts/success";
import {errorToast} from "../components/alerts/fail";
import {convertTimestamp} from "../utils/convertDate";
import parse from "date-fns/parse";

type Props = {
    cityId: number;
    item: CityType;
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void;
    setCities: any;
    setCitiesCount: any;
    params: GetParamsType;
}

export interface EditFormValuesType {
    name: string;
    coordinates: string;
    area: number | null;
    population: number;
    metersAboveSeaLevel: number | null;
    climate: string | null;
    government: string;
    standardOfLiving: string;
    governor: HumanType | null;
}

const validateSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').max(30, 'Too long').required('required'),
    // coordinates should fix, now it gets all number | , | .
    coordinates: Yup.string().trim().matches(/^[0-9,.]/).required('required'),
    population: Yup.number().min(1).required(),
    area: Yup.number().min(1).nullable(true),
    metersAboveSeaLevel: Yup.number().min(1).nullable(true),
    climate: Yup.string().nullable(true),
    // исправить enum, работает не дает отправить но не показывает для пользователя что не ок
    standardOfLiving: Yup.string().required('required'),
    government: Yup.mixed<GovernmentTypes>().oneOf(Object.values(GovernmentTypes)).required('required'),
    governor: Yup.object().shape({
        age: Yup.number().min(1),
        height: Yup.number().min(60.0),
        birthday: Yup.date()
            .transform(function (value, originalValue) {
                if (this.isType(value)) {
                    return value;
                }
                return parse(originalValue, "yyyy.MM.dd", new Date());
            })
            .typeError("please enter a valid date")
            .required()
            .max("2022-11-17", "Date is too late")
            .min("1940-11-13", "Date is too early"),
    }).nullable(true),
})

export const EditCityModal: FC<Props> = ({
    item,
     cityId ,
    isOpen,
    setIsOpen,
    params,
    setCities,
    setCitiesCount,
}) => {
    const [isGovernor, setIsGovernor] = useState(false);
    const [ inputValue, setInputValue ] = useState('');

    const closeModal = () => {
        setIsGovernor(false);
        setInputValue('');
        setIsOpen(false);
        setInputValue('');
    }

    const getCities = async () => {
        const cities = await getCityFetch(params);

        setCities(cities?.data.cities);
        setCitiesCount(cities?.data.count);
    }

    const editNewCity = async (values: EditFormValuesType, formikHelpers: FormikHelpers<EditFormValuesType>) => {
        const { id } = item.coordinates;
        const newData: Omit<CityType, 'id'> = {
            ...values,
            creationDate: item.creationDate,
            coordinates: {
                id,
                x: Number(values.coordinates.split(",")[0]),
                y: Number(values.coordinates.split(",")[1]),
            }
        }
        const sendData = {
            id: cityId,
            body: newData
        }
        console.log(sendData, 'post data');
        const res = await useFetch("PUT", urls.editCity, '', sendData)

        closeModal();

        await getCities();

        formikHelpers.resetForm();

        console.log(res);

        res?.status === 200 ? successToast("City edited successfully") : (res?.status === 500 ? errorToast(res.data.message) :  errorToast("can't edit city, try again please..."));
    }

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay opacity='0.4' />
                <ModalContent
                    mt='10px'
                    mb='0px'
                    minW='699px'
                    h='645'
                    borderRadius="6px"
                    color={'#000000'}
                    bg={'#FFFFFF'}
                    p="20px 28px"
                    overflow="hidden"
                >
                    <ModalHeader p="0">
                        <Flex justifyContent="space-between">
                            <Text align='center' fontSize='22px' fontWeight="700">
                                Edit City
                            </Text>
                            <Box cursor="pointer" onClick={closeModal}>
                                <CloseIcon />
                            </Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody p="0">
                        <Formik<EditFormValuesType>
                            enableReinitialize
                            initialValues={{
                                name: item.name,
                                coordinates: `${item.coordinates.x}, ${item.coordinates.y}`,
                                area: item.area,
                                population: item.population,
                                metersAboveSeaLevel: item.metersAboveSeaLevel,
                                climate: item.climate,
                                government: item.government,
                                standardOfLiving: item.standardOfLiving,
                                governor: (item.governor !== null ? {
                                    ...item.governor,
                                    birthday: convertTimestamp(item.governor?.birthday),
                                } : null),
                            }}
                            validationSchema={validateSchema}
                            onSubmit={ async (values: EditFormValuesType, formikHelpers: FormikHelpers<EditFormValuesType>) => {
                                console.log(values, 'value');
                                await editNewCity(values, formikHelpers);
                            }}
                        >
                            {({ isSubmitting, dirty, isValid, values }) => (
                                <Form id="editing-city-form" style={{display: "flex", justifyContent: "space-between", marginTop: '15px'}}>
                                    <Box d={"flex"}  flexDir="column" gridGap="20px" w="90%" paddingRight="5%">
                                        <Box flexDir="column">
                                            <TextInput
                                                labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                autoComplete="on"
                                                name='name'
                                                label='City name'
                                                w="100%"
                                                h="43px"
                                                borderRadius="6px"
                                                style={{ border: "1px solid #C4C4C4"}}
                                                required
                                                placeholder='Enter new City name...'
                                                _placeholder={{ color: "#C4C4C4" }}
                                            />
                                        </Box>
                                        <Box flexDir="column">
                                            <TextInput
                                                labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                autoComplete="on"
                                                name='coordinates'
                                                label='Coordinates'
                                                placeholder='x, y'
                                                w="100%"
                                                h="43px"
                                                borderRadius="6px"
                                                style={{ border: "1px solid #C4C4C4"}}
                                                required
                                                _placeholder={{ color: "#C4C4C4" }}
                                            />
                                        </Box>
                                        <Box flexDir="column">
                                            <TextInput
                                                labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                autoComplete="on"
                                                name='population'
                                                label='Population'
                                                type="number"
                                                placeholder='Enter city population...'
                                                w="100%"
                                                h="43px"
                                                borderRadius="6px"
                                                style={{ border: "1px solid #C4C4C4"}}
                                                _placeholder={{ color: "#C4C4C4" }}
                                                required
                                            />
                                        </Box>
                                        <Flex gridGap="20px">
                                            <Box flexDir="column">
                                                <TextInput
                                                    labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                    autoComplete="on"
                                                    name='area'
                                                    type="number"
                                                    label='Area'
                                                    placeholder='square'
                                                    w="100%"
                                                    h="43px"
                                                    borderRadius="6px"
                                                    style={{ border: "1px solid #C4C4C4"}}
                                                    _placeholder={{ color: "#C4C4C4" }}
                                                />
                                            </Box>
                                            <Box flexDir="column">
                                                <TextInput
                                                    labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                    autoComplete="on"
                                                    name='metersAboveSeaLevel'
                                                    label='Above sea level'
                                                    type="number"
                                                    placeholder='meters'
                                                    w="100%"
                                                    h="43px"
                                                    borderRadius="6px"
                                                    style={{ border: "1px solid #C4C4C4"}}
                                                    _placeholder={{ color: "#C4C4C4" }}
                                                />
                                            </Box>
                                        </Flex>
                                        <SelectField
                                            name="climate"
                                            label="Climate"
                                            options={[
                                                {
                                                    label: ClimateTypes.TROPICAL_SAVANNA,
                                                    value: ClimateTypes.TROPICAL_SAVANNA,
                                                },
                                                {
                                                    label: ClimateTypes.STEPPE,
                                                    value: ClimateTypes.STEPPE,
                                                },
                                                {
                                                    label: ClimateTypes.OCEANIC,
                                                    value: ClimateTypes.OCEANIC,
                                                },
                                            ]}
                                            placeholder="Add City's Climate"
                                        />
                                    </Box>

                                    <Divider orientation='vertical' height="490px" w="1px" background="rgba(196, 196, 196, 0.5)" />

                                    <Box d={"flex"}  flexDir="column" gridGap="20px" w="90%" paddingLeft="5%">
                                        <SelectField
                                            name="standardOfLiving"
                                            label="Living Standard"
                                            options={[
                                                {
                                                    label: LivingStandardTypes.VERY_LOW,
                                                    value: LivingStandardTypes.VERY_LOW,
                                                },
                                                {
                                                    label: LivingStandardTypes.LOW,
                                                    value: LivingStandardTypes.LOW,
                                                },
                                                {
                                                    label: LivingStandardTypes.MEDIUM,
                                                    value: LivingStandardTypes.MEDIUM,
                                                },
                                                {
                                                    label: LivingStandardTypes.NIGHTMARE,
                                                    value: LivingStandardTypes.NIGHTMARE,
                                                },
                                                {
                                                    label: LivingStandardTypes.ULTRA_HIGH,
                                                    value: LivingStandardTypes.ULTRA_HIGH,
                                                },
                                            ]}
                                            placeholder="Add City's Climate"
                                            required
                                        />

                                        <SelectField
                                            name="government"
                                            label="Government Type"
                                            options={[
                                                {
                                                    label: GovernmentTypes.PUPPET_STATE,
                                                    value: GovernmentTypes.PUPPET_STATE,
                                                },
                                                {
                                                    label: GovernmentTypes.THEOCRACY,
                                                    value: GovernmentTypes.THEOCRACY,
                                                },
                                                {
                                                    label: GovernmentTypes.OLIGARCHY,
                                                    value: GovernmentTypes.OLIGARCHY,
                                                },
                                                {
                                                    label: GovernmentTypes.THALASSOCRACY,
                                                    value: GovernmentTypes.THALASSOCRACY,
                                                },
                                            ]}
                                            placeholder="Add City's Climate"
                                            required
                                        />
                                        {item.governor ?
                                            <>
                                                <Flex gridGap="20px">
                                                    <Box flexDir="column">
                                                        <TextInput
                                                            labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                            autoComplete="on"
                                                            name='governor.age'
                                                            label='Age'
                                                            placeholder='Governor age'
                                                            w="100%"
                                                            h="43px"
                                                            type="number"
                                                            borderRadius="6px"
                                                            style={{ border: "1px solid #C4C4C4"}}
                                                            _placeholder={{ color: "#C4C4C4" }}
                                                        />
                                                    </Box>
                                                    <Box flexDir="column">
                                                        <TextInput
                                                            labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                            autoComplete="on"
                                                            name='governor.height'
                                                            label='Height'
                                                            placeholder='Governor height'
                                                            w="100%"
                                                            h="43px"
                                                            type="number"
                                                            borderRadius="6px"
                                                            style={{ border: "1px solid #C4C4C4"}}
                                                            _placeholder={{ color: "#C4C4C4" }}
                                                        />
                                                    </Box>
                                                </Flex>
                                                <Box flexDir="column">
                                                    <TextInput
                                                        labelStyles={{ color: "#5D5D5D", fontSize: "16px" }}
                                                        autoComplete="on"
                                                        name='governor.birthday'
                                                        label='Birthday'
                                                        placeholder='dd/mm/yyyy'
                                                        w="100%"
                                                        h="43px"
                                                        borderRadius="6px"
                                                        style={{ border: "1px solid #C4C4C4"}}
                                                        _placeholder={{ color: "#C4C4C4" }}
                                                    />
                                                </Box>
                                            </>
                                            : <Text color="blue.500" cursor="pointer" onClick={() => {
                                                values.governor = null;
                                                setIsGovernor(!isGovernor);
                                            }}>
                                                {isGovernor ? 'Remove Governor fields...' : 'Add Governor fields...'}
                                            </Text>
                                        }
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter p="0" d="flex" justifyContent="space-between">
                        <Button
                            onClick={closeModal}
                            h="38px"
                            w='140px'
                            borderRadius="4px"
                            border={'1px solid #5C59EC'}
                            color="#5C59EC"
                            bg={'transparent'}
                            // _focus={{ bg: "white.700" }}
                            // _active={{ bg: "blue" }}
                            // _hover={{
                            //     bg: '#3047FE',
                            // }}
                        >
                            <Text fontSize="14px">Cancel</Text>
                        </Button>

                        <Button
                            type="submit"
                            form="editing-city-form"
                            h="38px"
                            w='140px'
                            borderRadius="4px"
                            bg={'#5C59EC;'}
                            _focus={{ bg: "white.700" }}
                            _active={{ bg: "blue" }}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            <Text fontSize="14px" color="#FFF">Edit</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
