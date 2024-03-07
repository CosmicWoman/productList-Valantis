import React from 'react';
import './MainPage.scss'
import Header from "../../Header/Header";
import ProductsPage from "../ProductPage/ProductsPage";
import Footer from "../../Footer/Footer";

const MainPage = () => {
    return (
        <div className='mainPage'>
            <Header/>
            <ProductsPage/>
            <Footer/>
        </div>
    );
};

export default MainPage;