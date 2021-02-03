import React from 'react';
import Book from '../containers/Book';
import { Container } from 'react-bootstrap';



const DutchLibary = () => {
    return (
        <Container>DUTCH BOOKS
            <Book language='dutch' />
        </Container>
    )
}



export default DutchLibary;