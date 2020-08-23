import React from 'react';
import Book from '../containers/Book';
import { Container } from 'react-bootstrap';


const EnglishLibrary = () => {
    return (
        <Container>ENGLISH BOOKS
            <Book language='english' />
        </Container>
    )

}

export default EnglishLibrary;