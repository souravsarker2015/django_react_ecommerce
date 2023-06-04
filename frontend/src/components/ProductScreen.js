// import products from "../products";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Rating} from "./Rating";
import axios from 'axios';
import {useEffect, useState} from "react";

export function ProductScreen({match}) {
    const {id} = useParams();
    const [product, setProduct] = useState([])
    useEffect(() => {
        async function fetchProduct() {
            const {data} = await axios.get(`/api/products/${id}`)
            // const data = await response.json()
            setProduct(data)
        }

        fetchProduct();
    }, [id]);

    // const product = products.find((p) => p._id === id)
    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            {/*<span className={'text-black'}>{product.name}</span>*/}
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3} className={'card rounded'}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            price: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card className={'card rounded px-1'}>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>{product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type={'button'} disabled={product.countInStock === 0} className={'btn-block'}>Add
                                    to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}