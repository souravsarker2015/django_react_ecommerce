import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {register} from "../actions/UserActions";
import {FormContainer} from "../components/FormContainer";
import {Message} from "../components/Message";
import {Loader} from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export function RegisterScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const path = useLocation();
    const redirect = path.search ? path.search.split('=')[1] : '/';
    console.log(redirect);

    const userRegister = useSelector(state => state.userRegister);
    const {error, loading, userInfo} = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted');

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && (<Message variant={'danger'}>{message}</Message>)}
            {error && (<Message variant={'danger'}>{error}</Message>)}
            {loading && (<Loader/>)}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control required type={'text'} placeholder={'Enter Username'} value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'email'}>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required type={'email'} placeholder={'Enter Email'} value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'password'}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required type={'password'} placeholder={'Enter Password'} value={password} onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId={'passwordConfirm'}>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control required type={'password'} placeholder={'Confirm Password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type={'submit'} variant={'primary'} className={'mt-3'}>Sign Up</Button>
            </Form>
            <Row className={'py-3'}>
                <Col>
                    Have and account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    );
}