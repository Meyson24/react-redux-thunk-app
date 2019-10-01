import React from 'react'
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookItem = ({book, showLinkToBook}) => (
    <Jumbotron>
        <h1>Title: {book.title}</h1>
        <p>Description: {book.description}</p>
        <p>Price: {book.price}$</p>
        {/*<p>Author: {book.author.email}$</p>*/}
        <p>
            {showLinkToBook ?
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: `/post/${book.id}`
                    }}>
                        <Button variant="success">
                            See detail
                        </Button>
                    </Link>
                : ""
            }
        </p>
    </Jumbotron>
);

export default BookItem