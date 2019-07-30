import React from 'react'
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

const SortPanel = ({isSorting, isActive, methodOfSort}) => (
        <Col style={{marginBottom: '20px'}} xs={4}>
            <h4 className="center">Sort: {isActive} {methodOfSort}</h4>
            <ButtonGroup>
                <Button onClick={() => isSorting('title')} className={isActive === 'title' ? 'active' : ''}
                        variant="outline-dark">Title</Button>
                <Button onClick={() => isSorting('description')} className={isActive === 'description' ? 'active' : ''}
                        variant="outline-dark">Description</Button>
                <Button onClick={() => isSorting('price')} className={isActive === 'price' ? 'active' : ''}
                        variant="outline-dark">Price</Button>
            </ButtonGroup>
        </Col>
);

export default SortPanel