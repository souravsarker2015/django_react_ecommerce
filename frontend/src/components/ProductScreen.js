// import products from "../products";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import {Rating} from "./Rating";
// import axios from 'axios';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/ProductActions";
import {Loader} from "./Loader";
import {Message} from "./Message";

// import {Product} from "./Product";

export function ProductScreen() {
    const navigate = useNavigate();
    const [qty, setQty] = useState(1)
    const {id} = useParams();
    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
        // async function fetchProduct() {
        //     const {data} = await axios.get(`/api/products/${id}`)
        //     // const data = await response.json()
        //     setProduct(data)
        // }

        // fetchProduct();
    }, [dispatch, id]);
    // const product = products.find((p) => p._id === id)

    const addToCartHandler = () => {
        // console.log('add to cart : ', id)
        // history.push(`/cart/${id}?qty=${qty}`)
        navigate(`/cart/${id}?qty=${qty}`);
    }
    return (
        <div>
            <Link to={'/'} className={'btn btn-light my-3'}>Go Back</Link>
            {/*<span className={'text-black'}>{product.name}</span>*/}
            {
                loading ? (<Loader/>)
                    : error ? (<Message variant={'danger'}>{error}</Message>)
                        : (
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

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col xs={'auto'} className={'my-1'}>
                                                            <Form.Control as={'select'} value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button onClick={addToCartHandler} type={'button'} disabled={product.countInStock === 0} className={'btn-block'}>Add
                                                    to Cart</Button>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }

        </div>
    );
}