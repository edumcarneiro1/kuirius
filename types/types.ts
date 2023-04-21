export interface ICity {
    _id: number;
    name: string;
    featured: boolean;
}

export interface IRestaurantDish {
    _id?: string;
    name: string;
    city: string;
    link: string;
    score: string;
    author: string;
    dateOfCreation: string;
    dish: string;
}


export interface IDish {
    _id?: number;
    name: string;
}