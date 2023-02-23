export interface ICity {
    _id: number;
    name: string;
    featured: boolean;
}

export interface IRestaurantDish {
    id: number;
    name: string;
    city: string;
    link: string;
    score: number;
    author: string;
    dateOfCreation: number;
    dishes?: IDish[];
}


export interface IDish {
    _id: number;
    name: string;
}