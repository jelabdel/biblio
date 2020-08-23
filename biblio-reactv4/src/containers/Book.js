import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import { requestBooks } from '../redux/actions/libraryActions'

class Book extends Component {

    componentDidMount() {
        this.props.onRequestBooks()
    }

    AlertError = () => {
        const [show, setShow] = useState(true);
        if (show) {
            return (
                <Alert variant="danger" onClose={() => { setShow(false) }} dismissible>{'YOU ARE NOT SIGNED IN, PLEASE SIGN IN.'}
                </Alert>
            );
        } else
            return null;
    }

    render() {
        return (
            <Container>
                {
                    this.props.user && this.props.books.length !== 0 ?
                        this.props.books.data.map((book, i) => {
                            return book.lang === this.props.language ?
                                <Row key={i}>
                                    <Col lg={4} sm={6}>
                                        <Card >
                                            <Card.Body>
                                                <Card.Text >
                                                    {book.title}
                                                </Card.Text>
                                            </Card.Body>
                                            <NavLink to={{
                                                pathname: `/edit/${book.id}`,
                                                bookProps: book
                                            }}>
                                                <Card.Img variant="bottom" src={`../img/${book.image}`} />
                                            </NavLink>
                                        </Card>
                                    </Col>
                                </Row>
                                : '';
                        })
                        : <this.AlertError />
                }
            </Container>
        )   // closing return function
    } // closing render function

} // closing Book class

const mapStateToProps = state => {
    return {
        books: state.requestBooks.books,
        error: state.error,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestBooks: () => dispatch(requestBooks())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Book);