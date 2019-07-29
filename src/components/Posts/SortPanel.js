import React from 'react'
import {Button, ButtonGroup} from "react-bootstrap";

const SortPanel = ({sort, isActive}) => (
    <ButtonGroup>
        <Button onClick={sort('id')} className={isActive === 'default' ? 'active' : ''}
                variant="outline-dark">Default</Button>
        <Button onClick={(e) => sort('id')} className={isActive === 'id' ? 'active' : ''}
                variant="outline-dark">ID</Button>
        <Button onClick={sort('title')} className={isActive === 'title' ? 'active' : ''}
                variant="outline-dark">Title</Button>
        <Button onClick={(e) => sort('body')} className={isActive === 'body' ? 'active' : ''}
                variant="outline-dark">Description</Button>
    </ButtonGroup>
);

export default SortPanel