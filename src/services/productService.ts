

import ProductModel from "../models/productModel.js";


export const getAllProducts = async () => {
    return await ProductModel.find({});
}

export const seedInitialProducts = async () => {
    const initialProducts = [
        {
            imageUrl: 'https://picsum.photos/id/1/200/300',
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 19.99,
            stock: 100,
        },
        {
            imageUrl: 'https://picsum.photos/id/3/200/300',
            name: 'Product 2',  
            description: 'Description for Product 2',
            price: 29.99,
            stock: 150,
        },
        {
            imageUrl: 'https://picsum.photos/id/4/200/300',
            name: 'Product 3',
            description: 'Description for Product 3',
            price: 39.99,
            stock: 200,
        },
    ];  
    const existingProducts = await ProductModel.find({});
    if (existingProducts.length > 0) {
        console.log('Products already exist in the database. Skipping seeding.');
        return;
    }
    await ProductModel.insertMany(initialProducts);
    console.log('Initial products seeded to the database.');
}
