export interface ICity {
    id: number;
    name: string;
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
    id: number;
    name: string;
    score: number;
    restaurant: string;
    author: string;
    dateOfCreation: number;
    link: string;
}