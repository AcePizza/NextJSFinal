import { MongoClient } from 'mongodb'

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}


type Props = {
    getProducts: Data[]
    data: Data[];
};

type Products = Product[];

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

type ShoppingCart = {
    _id: string;
    userID: string;
    items: [ShoppingCartItems];
};

type ShoppingCartItems = {
    quantity: number;
    productId: string;
}

type ShoppingCartMap = [ShoppingCart]

type ShopCartPage = {
    getAllShoppingCartItems: ShoppingCartMap;
    getProducts: { id: number; image: string; title: string; price: number };
};

type ShoppingCartProps = {
    ShoppingCartItems: ShoppingCart;
    Products: { id: number; image: string; title: string; price: number };
};