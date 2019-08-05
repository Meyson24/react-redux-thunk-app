import React from 'react'
import { Col } from "react-bootstrap";
import SortingButton from "./SortingButton";

const SortPanel = ({isSorting, isActive, methodOfSort}) => (
    <Col style={{marginBottom: '20px'}} md="auto">
        <h4 className="center">Sorting:</h4>
        <SortingButton isSorting={isSorting}
                       itemSorting={'title'}
                       isActive={isActive}
                       methodOfSort={methodOfSort}/>
        <SortingButton isSorting={isSorting}
                       itemSorting={'description'}
                       isActive={isActive}
                       methodOfSort={methodOfSort}/>
        <SortingButton isSorting={isSorting}
                       itemSorting={'price'}
                       isActive={isActive}
                       methodOfSort={methodOfSort}/>
    </Col>
);

export default SortPanel