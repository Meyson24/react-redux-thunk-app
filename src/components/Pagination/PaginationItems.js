import React from 'react'
import { Pagination } from "react-bootstrap";

const PaginationItems = ({page, total, onGoToPage}) => {

    const totalPages = [...Array(total).keys()].map(i => ++i);
    const currentPage = parseInt(page);

    return <Pagination>
        {currentPage !== 1 ?
            <Pagination.Prev onClick={() => onGoToPage(currentPage - 1)}/>
            :
            <Pagination.Prev disabled={true}/>
        }

        {totalPages.map(page => (
                <Pagination.Item key={page}
                                 onClick={() => onGoToPage(page)}
                                 active={page === currentPage}>{page}
                </Pagination.Item>
            )
        )}

        {currentPage !== total ?
            <Pagination.Next onClick={() => onGoToPage(currentPage + 1)}/>
            :
            <Pagination.Next disabled={true}/>
        }
    </Pagination>
};

export default PaginationItems