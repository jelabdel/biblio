import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { requestBooks } from '../redux/actions/libraryActions'

class Book extends Component {

    componentDidMount() {
        this.props.onRequestBooks()
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
                        : <p>you are not signed in</p>
                }
            </Container>
        )   // closing return function
    } // closing render function

} // closing Book class

const mapStateToProps = state => {
    return {
        books: state.requestBooks.books,
        isPending: state.requestBooks.isPending,
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