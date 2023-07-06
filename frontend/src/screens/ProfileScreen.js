import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getUserDetails, updateUserProfile} from "../actions/UserActions";
import {Message} from "../components/Message";
import {Loader} from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/UserConstants";

export function ProfileScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    console.log(success)
    console.log(userUpdateProfile)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, success, user, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted');

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUserProfile({
                "id": user._id,
                "name": name,
                "email": email,
                "password": password
            }))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && (<Message variant={'danger'}>{message}</Message>)}
                {error && (<Message variant={'danger'}>{error}</Message>)}
                {loading && (<Loader/>)}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={'name'}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type={'text'} placeholder={'Enter Username'} value={name} onChange={(e) => setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId={'passwordConfirm'}>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type={'password'} placeholder={'Confirm Password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Button type={'submit'} variant={'primary'} className={'mt-3'}>Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
}