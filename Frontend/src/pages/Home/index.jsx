import CardProductsEmpty from "../../components/CardProductEmpty";
import CardProducts from "../../components/CardProduct";
import CarouselMain from "../../components/CarrouselMain";
import Header from "../../components/Header";
import Carrousel from "../../components/carrousel";
import useProducts from "../../hooks/useProducts";
import ProductsList from "../../components/productsList";

export default function Home() {
    return (
        <>
            <Header />
            <Carrousel />
            <ProductsList/>
        </>
    )
}