import { MongoClient } from 'mongodb'

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}


type Props = {
    getProducts: Data[]
    data: Data[];
};

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};