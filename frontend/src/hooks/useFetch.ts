import axios from "axios";
import { domainUrl } from "../api/urls";

export const useFetch = <T>(method: string, url: string, urlParams?: string, data?: T ) => {
    switch (method) {
        case 'GET':
            return axios.get(url + (urlParams ? urlParams : ''))
            .then((res) => res)
            .catch((err) => console.log('Get method error:', err))

        case 'POST':
            return axios.post(url, data,{
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then((res) => res)
            .catch((err) => console.log('Post method error:', err))

        case 'PUT':
            return axios.put(url, data,{
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then((res) => res)
            .catch((err) => err.response)

        case 'DELETE':
            return axios.delete(url + (urlParams ? urlParams : ''),{
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then((res) => res)
            .catch((err) => console.log('Delete method error:', err))

        default:
            return;
    }

}