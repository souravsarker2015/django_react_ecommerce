// import products from "../products"
import {Col, Row} from "react-bootstrap";
import {Product} from "../components/Product";

// eslint-disable-next-line no-unused-vars
import axios from 'axios';

import {useEffect, useState} from "react";

export function HomeScreen() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            const {data} = await axios.get("/api/products/")
            // const data = await response.json()
            setProducts(data)
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}