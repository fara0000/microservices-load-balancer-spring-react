import React, {FC, useContext} from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {Form, Formik, FormikHelpers} from "formik";
import {TextInput} from "../../components/input/TextInput";
import {LivingStandardTypes} from "../../types/enums";
import {SelectField} from "../../components/select";
import {SettingFormBlockContext} from "../../store/SettingFormBlock.context";

export type Props = {

}

type FormValuesType = { filterValue: string, sortable: string }

export const SettingsFormBlock: FC<Props> = () => {
    const context = useContext(SettingFormBlockContext);

    const manipulateCityData = (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
        context?.setSettingFormBlockValue(values);
        formikHelpers.resetForm();
    }

    return (
        <Box
            h='auto'
            w='700px'
            bg={'rgb(5 37 83 / 19%)'}
            p="20px"
            borderRadius="6px"
            d="flex"
            flexDir="column"
        >
            <Text fontSize="32px" >Настроить список городов</Text>
            <Formik<FormValuesType>
                enableReinitialize
                initialValues={{
                    filterValue: '',
                    sortable: '',
                }}
                onSubmit={ async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
                    await manipulateCityData(values, formikHelpers);
                }}
            >
                {({ isSubmitting, dirty, isValid, values }) => (
                    <Form id="filter-form" style={{display: "flex", flexDirection: "column", marginTop: '15px'}}>
                        <Box d={"flex"} gridGap="20px">
                            <Box flexDir="row">
                                <TextInput
                                    autoComplete="on"
                                    name='filterValue'
                                    label='Фильтрация'
                                    w="230px"
                                    h="43px"
                                />
                            </Box>
                            <Box w={"230px"} h="50px">
                                <SelectField
                                    style={{ height: "100%" }}
                                    color={"black"}
                                    name="sortable"
                                    label="Сортировка"
                                    options={[
                                        {
                                            label: "id",
                                            value: "id",
                                        },
                                        {
                                            label: "name",
                                            value: "name",
                                        },
                                        {
                                            label: "coordinate id",
                                            value: "coordinates.id",
                                        },
                                        {
                                            label: "coordinate x",
                                            value: "coordinates.x",
                                        },
                                        {
                                            label: "coordinate y",
                                            value: "coordinates.y",
                                        },
                                        {
                                            label: "Creation Date",
                                            value: "creationDate",
                                        },
                                        {
                                            label: "area",
                                            value: "area",
                                        },
                                        {
                                            label: "population",
                                            value: "population",
                                        },
                                        {
                                            label: "metersAboveSeaLevel",
                                            value: "metersAboveSeaLevel",
                                        },
                                        {
                                            label: "Climate",
                                            value: "Climate",
                                        },
                                        {
                                            label: "Government",
                                            value: "government",
                                        },
                                        {
                                            label: "Standart of Living",
                                            value: "standardOfLiving",
                                        },
                                        {
                                            label: "Governor id",
                                            value: "governor.id",
                                        },
                                        {
                                            label: "Governor age",
                                            value: "governor.age",
                                        },
                                        {
                                            label: "Governor height",
                                            value: "governor.height",
                                        },
                                        {
                                            label: "Governor birthday",
                                            value: "governor.birthday",
                                        },
                                    ]}
                                    placeholder="Select sorting element"
                                />
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>

            <Flex w="100%" justifyContent="flex-end">
                <Button
                    form='filter-form'
                    type='submit'
                    ml='34px'
                    mt="34px"
                    h="41px"
                    w="auto"
                    borderRadius="4px"
                    bg={'rgb(255 255 255 / 8%);'}
                    _focus={{ bg: "#31ce7c" }}
                    _active={{ bg: "#31ce7c" }}
                    _hover={{
                        bg: '#31ce7c',
                    }}
                >
                    <Text fontSize="16px">Применить изменения</Text>
                </Button>
            </Flex>
        </Box>
    )
}