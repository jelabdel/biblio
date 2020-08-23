import React from 'react';
import Book from '../containers/Book';
import { Container } from 'react-bootstrap';

const ArabicLibrary = () => {
    return (
        <Container>ARABIC BOOKS
            <Book language='arabic' />
        </Container>
    )
}

export default ArabicLibrary;