import React from 'react'
import { Pagination } from "react-bootstrap";

const PaginationItems = ({page, total, goToBookPage}) => {
    const totalPages = [...Array(total).keys()].map(i => ++i);
    const currentPage = parseInt(page);

    return <Pagination>
        {currentPage !== 1 ?
            <Pagination.Prev onClick={() => goToBookPage(currentPage - 1)}/>
            :
            <Pagination.Prev disabled={true}/>
        }

        {totalPages.map(page => (
                <Pagination.Item key={page}
                                 onClick={() => goToBookPage(page)}
                                 active={page === currentPage}>{page}
                </Pagination.Item>
            )
        )}

        {currentPage !== total ?
            <Pagination.Next onClick={() => goToBookPage(currentPage + 1)}/>
            :
            <Pagination.Next disabled={true}/>
        }
    </Pagination>
};

export default PaginationItems