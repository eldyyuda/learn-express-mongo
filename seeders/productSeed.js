const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop-db').then(() => {
    console.log('DB is connected');
}).catch((err) => {
    console.log(err);
});

const Product = require('../models/product');

const seedProducts = [
    {
        name : 'Kemeja Flannel',
        brand : 'Hollister',
        price : 75000,
        color : 'light blue',
        size : 'S',
        category : 'Baju'
    },
    {
        name : 'Kacamata Aviator',
        brand : 'Ray-Ban',
        price : 2000000,
        color : 'Gold',
        size : 'L',
        category : 'Aksesoris'

    },
    {
        name : 'Baju Renang',
        brand : 'Speedo',
        price : 500000,
        color : 'Dark Blue',
        size : 'S',
        category : 'Baju'
    },
    {
        name : 'Jas',
        brand : 'Hugo Boss',
        price : 4500000,
        color : 'Black',
        size : 'M',
        category : 'Baju'

    },
    {
        name : 'Celana Ankle Pants',
        brand : 'Uniqlo',
        price : 10000000,
        color : 'Red',
        size : 'M',
        category : 'Celana'
    }
];

Product.insertMany(seedProducts).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

