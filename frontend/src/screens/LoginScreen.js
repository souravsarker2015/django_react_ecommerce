import {useEffect, useState} from "react";
import {FormContainer} from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
// import queryString from 'query-string';
import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/UserActions";
import {Message} from "../components/Message";
import {Loader} from "../components/Loader";

export function LoginScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const search_query = queryString.parse(window.location.search);
    // console.log(search_query.search);
    // const data= useParams();
    const path = useLocation();
    const redirect = path.search ? path.search.split('=')[1] : '/';
    console.log(redirect)
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted')
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && (<Message variant={'danger'}>{error}</Message>)}
            {loading && (<Loader/>)}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'email'}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type={'email'} placeholder={'Enter Email'} value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'password'}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type={'password'} placeholder={'Enter Password'} value={password} onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type={'submit'} variant={'primary'} className={'mt-3'}>Sign In</Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}