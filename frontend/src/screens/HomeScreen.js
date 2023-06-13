// import products from "../products"
import {Col, Row} from "react-bootstrap";
import {Product} from "../components/Product";

// eslint-disable-next-line no-unused-vars
// import axios from 'axios';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/ProductActions";
import {Loader} from "../components/Loader";
import {Message} from "../components/Message";

export function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    // const [products, setProducts] = useState([])
    useEffect(() => {
        dispatch(listProducts())
        // async function fetchProducts() {
        // const {data} = await axios.get("/api/products/")
        // // const data = await response.json()
        // setProducts(data)
        // }

        // fetchProducts();
    }, [dispatch]);
    return (
        <div>
            <h1>Latest Products</h1>
            {
                loading ? (<Loader/>)
                    : error ? (<Message variant={'danger'}>{error}</Message>)
                        : (
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product}/>
                                    </Col>
                                ))}
                            </Row>
                        )
            }

        </div>
    );
}