import {Spinner} from "react-bootstrap";


export function Loader() {
    return (
        <Spinner animation="border" role="status" style={{
            height: '100px',
            width: '100px',
            margin: 'auto',
            display: 'block',
        }}>
            {/*<span className="visually-hidden">Loading...</span>*/}
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}