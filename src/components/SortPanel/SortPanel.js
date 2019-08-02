import React from 'react'
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import SortingButton from "./SortingButton";

const SortPanel = ({isSorting, isActive, methodOfSort}) => (
    <Col style={{marginBottom: '20px'}} xs={4}>
        <h4 className="center">Sort: {isActive} {methodOfSort}</h4>
        <ButtonGroup>
            <SortingButton isSorting={isSorting} itemSorting={'title'} isActive={isActive} methodOfSort={methodOfSort}/>
            <SortingButton isSorting={isSorting} itemSorting={'description'} isActive={isActive} methodOfSort={methodOfSort}/>
            <SortingButton isSorting={isSorting} itemSorting={'price'} isActive={isActive} methodOfSort={methodOfSort}/>
            {/*<Button onClick={() => isSorting('title')} className={isActive === 'title' ? 'active' : ''}*/}
            {/*        variant="outline-dark" >*/}
            {/*    Title*/}
            {/*    <span className={methodOfSort === 'asc' ? 'arrow-icon open' : 'arrow-icon' && isActive === 'title' ? 'arrow-icon' : 'arrow-icon open'}>*/}
            {/*        <span className="left-bar"></span>*/}
            {/*        <span className="right-bar"></span>*/}
            {/*    </span>*/}
            {/*</Button>*/}
            {/*<Button onClick={() => isSorting('description')} className={isActive === 'description' ? 'active' : ''}*/}
            {/*        variant="outline-dark">*/}
            {/*    Description*/}
            {/*    <a className={methodOfSort === 'asc' ? 'arrow-icon open' : 'arrow-icon' && isActive === 'description' ? 'arrow-icon' : 'arrow-icon open'}>*/}
            {/*        <span className="left-bar"></span>*/}
            {/*        <span className="right-bar"></span>*/}
            {/*    </a>*/}
            {/*</Button>*/}
            {/*<Button onClick={() => isSorting('price')} className={isActive === 'price' ? 'active' : ''}*/}
            {/*        variant="outline-dark">*/}
            {/*    Price*/}
            {/*    <a className={methodOfSort === 'asc' ? 'arrow-icon open' : 'arrow-icon' && isActive === 'price' ? 'arrow-icon' : 'arrow-icon open'}>*/}
            {/*        <span className="left-bar"></span>*/}
            {/*        <span className="right-bar"></span>*/}
            {/*    </a>*/}
            {/*</Button>*/}
        </ButtonGroup>
    </Col>
);

export default SortPanel