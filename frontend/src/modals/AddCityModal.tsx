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
import React, {FC, useState} from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {CloseIcon} from "../assets/svg/CloseIcon";
import {Form, Formik, FormikHelpers} from "formik";
import {TextInput} from "../components/input/TextInput";
import {SelectField} from "../components/select";
import {ClimateTypes, GovernmentTypes, LivingStandardTypes} from "../types/enums";
import {useFetch} from "../hooks/useFetch";
import * as urls from "../api/urls";
import {CityType, GetParamsType, HumanType} from "../types/types";
import * as Yup from 'yup';
import parse from "date-fns/parse";
import {getCityFetch} from "../api";
import {successToast} from "../components/alerts/success";
import {errorToast} from "../components/alerts/fail";

interface FormValuesType {
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

type Props = {
    setCities: any;
    setCitiesCount: any;
    params: GetParamsType;
}

const validateSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').max(30, 'Too long').required('required'),
    // coordinates should fix, now it gets all number | , | .
    coordinates: Yup.string().trim().matches(/^[0-9,.]/).required('required'),
    population: Yup.number().min(1).required(),
    area: Yup.number().min(1).required('required'),
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

export const AddCityModal: FC<Props> = ({ setCities, setCitiesCount, params }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isGovernor, setIsGovernor] = useState(false);
    const token = localStorage.getItem('authToken')
    const [ inputValue, setInputValue ] = useState('');

    const closeModal = () => {
        setIsGovernor(false);
        setInputValue('');
        onClose();
        setInputValue('');
    }

    const getCities = async () => {
        const cities = await getCityFetch(params);

        setCities(cities?.data.cities);
        setCitiesCount(cities?.data.count);
    }

    const addNewCity = async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
        const newData: Omit<CityType, 'id'> = {
            ...values,
            creationDate: new Date(),
            coordinates: {
                x: Number(values.coordinates.split(",")[0]),
                y: Number(values.coordinates.split(",")[1]),
            }
        }
        const newDataWithGoverner: Omit<CityType, 'id'> = {
            ...values,
            creationDate: new Date(),
            governor: {
                age: values.governor?.age,
                height: values.governor?.height,
                birthday: new Date(values.governor?.birthday ? values.governor.birthday : '12/12/2000'),
            },
            coordinates: {
                x: Number(values.coordinates.split(",")[0]),
                y: Number(values.coordinates.split(",")[1]),
            }
        }
        const res = await useFetch("POST", urls.addCities, '', values.governor !== null ? newDataWithGoverner : newData)

        closeModal();

        await getCities();

        formikHelpers.resetForm();

        res?.status === 200 ? successToast("City has been added successfully") : errorToast("can't add city, try again please...");
    }

    return (
        <Box>
            <Box w="340px" h="110px" d="flex" alignItems="center" justifyContent="center" border="2px dashed #2f9e85" borderRadius="4px" onClick={onOpen}>
                <Icon as={AiOutlinePlus} h="30px" w="30px" cursor="pointer"/>
            </Box>
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
                                New City
                            </Text>
                            <Box cursor="pointer" onClick={closeModal}>
                                <CloseIcon />
                            </Box>
                        </Flex>
                    </ModalHeader>
                    <ModalBody p="0">
                        <Formik<FormValuesType>
                            enableReinitialize
                            initialValues={{
                                name: '',
                                coordinates: '',
                                population: 0,
                                area: null,
                                metersAboveSeaLevel: null,
                                climate: null,
                                standardOfLiving: '',
                                government: '',
                                governor: null,
                            }}
                            validationSchema={validateSchema}
                            onSubmit={ async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
                                // console.log(values, 'value');
                                await addNewCity(values, formikHelpers);
                            }}
                        >
                            {({ isSubmitting, dirty, isValid, values }) => (
                                <Form id="adding-city-form" style={{display: "flex", justifyContent: "space-between", marginTop: '15px'}}>
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
                                                    required
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
                                        <Text color="blue.500" cursor="pointer" onClick={() => {
                                            values.governor = null;
                                            setIsGovernor(!isGovernor);
                                        }}>
                                            {isGovernor ? 'Remove Governor fields...' : 'Add Governor fields...'}
                                        </Text>
                                        {isGovernor ?
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
                                                        placeholder='yyyy.dd.mm'
                                                        w="100%"
                                                        h="43px"
                                                        borderRadius="6px"
                                                        style={{ border: "1px solid #C4C4C4"}}
                                                        _placeholder={{ color: "#C4C4C4" }}
                                                    />
                                                </Box>
                                            </>
                                            : null
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
                            form="adding-city-form"
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
                            <Text fontSize="14px" color="#FFF">Save</Text>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}
