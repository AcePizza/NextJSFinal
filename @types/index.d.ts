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
    items: {
        quantity: number;
        productId: number;
    }

}

type ShopCartPage = {
    getAllShoppingCartItems: [ShoppingCartItems];
    getProducts: [{ id: number; image: string; title: string; price: number }];
};


type ShoppingCartProps = {
    ShoppingCartItems: ShoppingCartItems;
    Products: [{ id: number; image: string; title: string; price: number }];
};