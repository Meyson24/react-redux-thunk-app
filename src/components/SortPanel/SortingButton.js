import React from 'react'
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";

const SortingButton = ({isSorting, itemSorting, isActive, methodOfSort}) => (
    <Button onClick={() => isSorting(itemSorting)}
            className={isActive === itemSorting ? 'active' : ''}
            variant="outline-dark"
            style={{width: '180px'}}>
        {itemSorting.toUpperCase()}
        <span
            className={
                methodOfSort === 'asc' ? 'arrow-icon open' : 'arrow-icon'
                &&
                isActive === itemSorting ? 'arrow-icon' : 'arrow-icon open'
            }>
            <span className="left-bar"></span>
            <span className="right-bar"></span>
        </span>
    </Button>
);

export default SortingButton