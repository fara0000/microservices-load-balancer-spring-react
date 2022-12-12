export type CoordinatesType = {
    id: number;
    x: number;
    y: number;
}

export type HumanType = {
    age?: number;
    height?: number;
    birthday?: Date | number | null | string;
}

export type CityType = {
    id: number;
    name: string;
    coordinates: CoordinatesType | any;
    creationDate: Date | number | null | string;
    area: number | null;
    population: number;
    metersAboveSeaLevel: number | null;
    climate: string | null;
    government: string;
    standardOfLiving: string;
    governor: HumanType | null;
}

export type GetParamsType = {
    sortable: string;
    limit: number;
    offset: number;
    filter: string;
}