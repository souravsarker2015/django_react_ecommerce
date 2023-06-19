import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Container} from "react-bootstrap";
import {HomeScreen} from "./screens/HomeScreen";
import {Route, Routes} from 'react-router-dom'
import {ProductScreen} from "./components/ProductScreen";
import {CartScreen} from "./screens/CartScreen";

// import {AllRoutes} from "./AllRoutes";

function App() {
    return (
        <>
            <Header/>
            <Container>
                <main className={"py-5"}>
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="product/:id" element={<ProductScreen/>}/>
                        <Route path="cart/:id?" element={<CartScreen/>}/>
                    </Routes>

                </main>
            </Container>

            <Footer/>
        </>
    );
}

export default App;
