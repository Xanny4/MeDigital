import express from 'express';
import Category from '../models/category.js';
import Product from '../models/product.js';
import { where } from 'sequelize';
const router = express.Router();

router.post('/delete_category/:id', async (req, res) => {
    const id = req.params.id;
    await Category.destroy({ where: { id: id } })
        .then(result => {
            Product.destroy({ where: { categoryId: id } })
            res.redirect('/dashboard');
        })
        .catch(error => {
            console.log(error);
            res.redirect('/dashboard');
        })
})

router.post('/delete_product/:cid/:id', async (req, res) => {
    const id = req.params.id;
    const cid = req.params.cid;
    await Product.destroy({ where: { id: id } })
        .then(result => {
            res.redirect('/products/' + cid);
        })
        .catch(error => {
            console.log(error);
            res.redirect('/products/' + cid);
        })
})

router.post('/edit_category/:id', async (req, res) => {
    const { categoryName, categoryMainImage } = req.body;
    const id = req.params.id;
    await Category.update({ categoryName: categoryName, categoryMainImage: categoryMainImage }, { where: { id: id } })
        .then(result => {
            res.redirect('/products/' + id);
        })
        .catch(error => {
            console.log(error);
            res.redirect('/products/' + id);
        })
})
router.post('/add_category', async (req, res) => {
    const { categoryName, categoryMainImage } = req.body;
    Category.create({
        categoryName: categoryName,
        categoryMainImage: categoryMainImage
    })
        .then(result => {
            console.log(result);
            return res.redirect('/dashboard');
        })
        .catch(error => {
            console.log(error.message);
            return res.redirect('/dashboard');
        })
})

router.post('/add_product/:id', async (req, res) => {
    const id = req.params.id;
    const { productName, productMainImage, productPrice, productDescription, isAvailable, unitInStock } = req.body;
    Product.create({
        productName: productName,
        productMainImage: productMainImage,
        productPrice: productPrice,
        productDescription: productDescription,
        isAvailable: isAvailable,
        unitInStock: unitInStock,
        categoryId: id
    })
        .then(result => {
            res.redirect('/products/' + id);
        })
        .catch(error => {

        })
})

router.post('/edit_product/:id', async (req, res) => {
    const id = req.params.id;
    const { productName, productMainImage, productPrice, productDescription, isAvailable, unitInStock, categoryId } = req.body;
    await Product.update({
        productName: productName,
        productMainImage: productMainImage,
        productPrice: productPrice,
        productDescription: productDescription,
        isAvailable: isAvailable,
        unitInStock: unitInStock,
        categoryId: categoryId
    }, { where: { id: id } })
        .then(result => {
            res.redirect('/products/' + categoryId);
        })
        .catch(error => {
            res.redirect('/dashboard');
        })
})



export default router;