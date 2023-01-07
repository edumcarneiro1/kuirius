export interface ICity {
    _id: number;
    name: string;
    featured: boolean;
}

export interface IRestaurant {
    id: number;
    name: string;
    city: string;
    link: string;
    dateOfCreation: number;
    dishes?: IDish[];
}


export interface IDish {
    _id: number;
    name: string;
}