import {Col, Container, Row} from "react-bootstrap";

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className={"text-center py-3"}>
                        Copyright &copy; sarkerEcommerce
                    </Col>
                </Row>
            </Container>

        </footer>
    );
};