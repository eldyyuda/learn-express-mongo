const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const path = require('path');

const app = express();

const Product = require('./models/product');
const morgan = require('morgan');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
// app.use((req, res) => {
//     // console.log(req.method,req.url);
//     res.status(404).send('halaman ini tidak ada Asyu lu');
//     // req.timeRequest = Date.now();
// });



mongoose.connect('mongodb://localhost:27017/shop-db').then(() => {
    console.log('DB is connected');
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// app.get('/', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.status(200).send('<h1>Hello World</h1>');
// });
const auth = (req, res, next) => {
    const {password} = req.query;
    if (password === '12345') {
        next();
    } 
    res.send('password belum dimasukkan');
}
app.get('/admin',auth, async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('halaman admin');

});
app.get('/products',async (req, res) => {
    // console.log(req.timeRequest);
    const {category} = req.query;
    if (!category) {
        const products = await Product.find({});
        return res.render('products/index', { products ,category:'All'});
    }
    const products = await Product.find({category});
    return res.render('products/index', { products ,category});
});
app.get('/products/create', (req, res) => {
    res.render('products/create');
    // res.render('Create Product');
});

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/details', {product});
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
});

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});
});

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect('/products');
});

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});


