import { MongoClient } from 'mongodb'

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}


type Props = {
    data: Data[];
};

type Data = {
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