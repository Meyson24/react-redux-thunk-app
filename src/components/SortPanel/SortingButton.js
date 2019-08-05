import React from 'react'
import { Button } from "react-bootstrap";

const SortingButton = ({isSorting, itemSorting, isActive, methodOfSort}) => (
    <Button onClick={() => isSorting(itemSorting)}
            className={isActive === itemSorting ? 'active' : ''}
            variant="outline-dark"
            style={{width: '180px'}}>
        {itemSorting.toUpperCase()}
        <span
            className={
                methodOfSort === 'asc' ? 'arrow-icon' : 'arrow-icon open'
                &&
                isActive === itemSorting ? 'arrow-icon open' : 'arrow-icon'
            }>
            <span className="left-bar"></span>
            <span className="right-bar"></span>
        </span>
    </Button>
);

export default SortingButton