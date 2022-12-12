import React, {FC, useContext, useEffect, useMemo, useState} from "react";
import {Box, Button, Flex, Icon, useColorMode, useDisclosure} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";
import {CityCard} from "../../components/card";
import {convertTimestamp} from "../../utils/convertDate";
import {useFetch} from "../../hooks/useFetch";
import * as urls from "../../api/urls";
import {AddCityModal} from "../../modals/AddCityModal";
import {DeleteCityModal} from "../../modals/DeleteCityModal";
import {CityType} from "../../types/types";
import {EditCityModal, EditFormValuesType} from "../../modals/EditCityModal";
import {CityInfoModal} from "../../modals/ CityInfoModal";
import {PaginationButton} from "../../components/pagination/PaginationButton";
import {SettingFormBlockContext} from "../../store/SettingFormBlock.context";

export type Props = {

}

const cityInitialData = {
    area: null,
    climate: null,
    coordinates: {
        id: 0,
        x: 0,
        y: 0,
    },
    creationDate: null,
    government: "",
    governor: null,
    id: 0,
    metersAboveSeaLevel: null,
    name: "",
    population: 0,
    standardOfLiving: ""
}

export const CitiesContainer: FC<Props> = () => {
    const context = useContext(SettingFormBlockContext);
    const [ citiesCount, setCitiesCount ] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCityInfoModalOpen, setIsCityInfoModalOpen] = useState(false);
    const [getParams, setGetParams] = useState({ sortable: '', limit: 5, offset: 1, filter: '' });
    const [selectedCity, setSelectedCity] = useState<CityType>(cityInitialData);
    const [cities, setCities] = useState<Array<CityType>>([]);
    let pages = new Array<number>(Math.ceil(citiesCount / getParams.limit));

    const fetchCity = useMemo(async () => {
        return useFetch("GET", urls.getCities, `?page=${getParams.offset}&size=${getParams.limit}&sortable=${getParams.sortable}&filter=${getParams.filter}`)
    }, [getParams.offset, getParams.sortable, getParams.filter])

    // @ts-ignore
    useEffect(async () => {
        const cities = await fetchCity;
        // @ts-ignore
        setCities(cities.data.cities);
        setCitiesCount(cities.data.cities.length < 1 ? 0 : cities?.data.count);
    }, [getParams.offset, getParams.sortable, getParams.filter]);



    useEffect(() => {
        setGetParams({ ...getParams, sortable: context.settingFormBlockValue.sortable, filter: context.settingFormBlockValue.filterValue })
    }, [context.settingFormBlockValue.sortable, context.settingFormBlockValue.filterValue]);

    return (
        <Flex flexDir="column" mt="20px" gridGap="20px">
            <Flex wrap={"wrap"} gridGap="20px">
                <AddCityModal setCitiesCount={setCitiesCount} setCities={setCities} params={getParams} />
                {cities?.map((item) => <CityCard
                    key={item.id}
                    name={item.name}
                    item={item}
                    onOpen={onOpen}
                    setSelectedCity={setSelectedCity}
                    setIsEditModalOpen={setIsEditModalOpen}
                    setIsCityInfoModalOpen={setIsCityInfoModalOpen}
                    creationDate={convertTimestamp(item.creationDate)}
                />)}
            </Flex>
            {Boolean(citiesCount) &&
                <Flex gridGap="10px" width="80%" justifyContent="center" alignItems="center">
                    <Button border="1px solid #FFFFFF" disabled={getParams.offset === 1} onClick={() => setGetParams({...getParams, offset: getParams.offset - 1})}>Prev</Button>
                    {pages.fill(4, 0).map((_item, index) => <PaginationButton params={getParams} setGetParams={setGetParams}>{index + 1}</PaginationButton>)}
                    <Button border="1px solid #FFFFFF" disabled={getParams.offset === pages.length} onClick={() => setGetParams({...getParams, offset: getParams.offset + 1})}>Next</Button>
                </Flex>
            }

            {isOpen &&
                <DeleteCityModal
                    item={selectedCity}
                    isOpen={isOpen}
                    onClose={onClose}
                    setCities={setCities}
                    params={getParams}
                    setCitiesCount={setCitiesCount}
                />
            }
            {isEditModalOpen &&
                <EditCityModal
                    cityId={selectedCity.id}
                    item={selectedCity}
                    isOpen={isEditModalOpen}
                    params={getParams}
                    setCities={setCities}
                    setIsOpen={setIsEditModalOpen}
                    setCitiesCount={setCitiesCount}
                />
            }
            {isCityInfoModalOpen &&
                <CityInfoModal
                    item={selectedCity}
                    isOpen={isCityInfoModalOpen}
                    setIsCityInfoModalOpen={setIsCityInfoModalOpen}
                />
            }
        </Flex>
    )
}