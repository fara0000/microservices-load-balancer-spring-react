import * as urls from './urls';
import { useFetch } from "../hooks/useFetch";
import {GetParamsType} from "../types/types";

export const getCityFetch = (params: GetParamsType) => {
    return useFetch("GET", urls.getCities, `?page=${params.offset}&size=${params.limit}&sortable=${params.sortable}&filter=${params.filter}`)
}

