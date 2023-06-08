import Sequelize from "sequelize";
import database from './database.js';
import Category from "./category.js";

const Product=database.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    productName: Sequelize.STRING,
    productMainImage:Sequelize.STRING,
    productPrice:Sequelize.INTEGER,
    productDescription:Sequelize.TEXT,
    isAvailable:Sequelize.BOOLEAN,
    unitInStock:Sequelize.INTEGER,
    categoryId:Sequelize.INTEGER
})

export default Product;