import {HomeScreen} from "./screens/HomeScreen";
import {ProductScreen} from "./components/ProductScreen";
import {Routes, Route} from "react-router-dom";

export const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="product/:id" element={<ProductScreen/>}/>
            </Routes>
        </>
    );
};