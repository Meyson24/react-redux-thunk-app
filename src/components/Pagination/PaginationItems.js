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

































// // class PaginationItems extends React.Component {
// //     constructor(props) {
// //         super(props);
// //
// //         this.state = {
// //             currentPage: null,
// //             pageCount: null
// //         }
// //     }
// //
// //     componentWillMount() {
// //         const startingPage = this.props.startingPage
// //             ? this.props.startingPage
// //             : 1;
// //         const data = this.props.data;
// //         const pageSize = this.props.pageSize;
// //         let pageCount = parseInt(data.length / pageSize);
// //         if (data.length % pageSize > 0) {
// //             pageCount++;
// //         }
// //         this.setState({
// //             currentPage: startingPage,
// //             pageCount: pageCount
// //         });
// //     }
// //
// //     setCurrentPage(num) {
// //         this.setState({currentPage: num});
// //     }
// //
// //     createControls() {
// //         let controls = [];
// //         const pageCount = this.state.pageCount;
// //         for (let i = 1; i <= pageCount; i++) {
// //             const baseClassName = 'pagination-controls__button';
// //             const activeClassName = i === this.state.currentPage ? `${baseClassName}--active` : '';
// //             controls.push(
// //                 <div
// //                     className={`${baseClassName} ${activeClassName}`}
// //                     onClick={() => this.setCurrentPage(i)}
// //                 >
// //                     {i}
// //                 </div>
// //             );
// //         }
// //         return controls;
// //     }
// //
// //     createPaginatedData() {
// //         const data = this.props.data;
// //         const pageSize = this.props.pageSize;
// //         const currentPage = this.state.currentPage;
// //         const upperLimit = currentPage * pageSize;
// //         const dataSlice = data.slice((upperLimit - pageSize), upperLimit);
// //         return dataSlice;
// //     }
// //
// //     render() {
// //         return (
// //             <div className='pagination'>
// //                 <div className='pagination-controls'>
// //                     {this.createControls()}
// //                 </div>
// //                 <div className='pagination-results'>
// //                     {React.cloneElement(this.props.children, {data: this.createPaginatedData()})}
// //                 </div>
// //             </div>
// //         );
// //     }
// // }
// //
// // PaginationItems.propTypes = {
// //     data: React.PropTypes.array.isRequired,
// //     pageSize: React.PropTypes.number.isRequired,
// //     startingPage: React.PropTypes.number.isRequired
// // };
// //
// // PaginationItems.defaultProps = {
// //     pageSize: 25,
// //     startingPage: 1
// // };
//
// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
//
// const LEFT_PAGE = 'LEFT';
// const RIGHT_PAGE = 'RIGHT';
//
// /**
//  * Helper method for creating a range of numbers
//  * range(1, 5) => [1, 2, 3, 4, 5]
//  */
// const range = (from, to, step = 1) => {
//     let i = from;
//     const range = [];
//
//     while (i <= to) {
//         range.push(i);
//         i += step;
//     }
//
//     return range;
// }
//
// class PaginationItems extends Component {
//
//     constructor(props) {
//         super(props);
//         const { totalRecords = null, pageLimit = 3, pageNeighbours = 0 } = props;
//
//         this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 3;
//         this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
//
//         // pageNeighbours can be: 0, 1 or 2
//         this.pageNeighbours = typeof pageNeighbours === 'number'
//             ? Math.max(0, Math.min(pageNeighbours, 2))
//             : 0;
//
//         this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
//
//         this.state = { currentPage: 1 };
//     }
//
//     componentDidMount() {
//         this.gotoPage(1);
//     }
//
//     gotoPage = page => {
//         const { onPageChanged = f => f } = this.props;
//
//         const currentPage = Math.max(0, Math.min(page, this.totalPages));
//
//         const paginationData = {
//             currentPage,
//             totalPages: this.totalPages,
//             pageLimit: this.pageLimit,
//             totalRecords: this.totalRecords
//         };
//
//         this.setState({ currentPage }, () => onPageChanged(paginationData));
//     }
//
//     handleClick = page => evt => {
//         evt.preventDefault();
//         this.gotoPage(page);
//     }
//
//     handleMoveLeft = evt => {
//         evt.preventDefault();
//         this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
//     }
//
//     handleMoveRight = evt => {
//         evt.preventDefault();
//         this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
//     }
//
//     /**
//      * Let's say we have 10 pages and we set pageNeighbours to 2
//      * Given that the current page is 6
//      * The pagination control will look like the following:
//      *
//      * (1) < {4 5} [6] {7 8} > (10)
//      *
//      * (x) => terminal pages: first and last page(always visible)
//      * [x] => represents current page
//      * {...x} => represents page neighbours
//      */
//     fetchPageNumbers = () => {
//
//         const totalPages = this.totalPages;
//         const currentPage = this.state.currentPage;
//         const pageNeighbours = this.pageNeighbours;
//
//         /**
//          * totalNumbers: the total page numbers to show on the control
//          * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
//          */
//         const totalNumbers = (this.pageNeighbours * 2) + 3;
//         const totalBlocks = totalNumbers + 2;
//
//         if (totalPages > totalBlocks) {
//
//             const startPage = Math.max(2, currentPage - pageNeighbours);
//             const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
//
//             let pages = range(startPage, endPage);
//
//             /**
//              * hasLeftSpill: has hidden pages to the left
//              * hasRightSpill: has hidden pages to the right
//              * spillOffset: number of hidden pages either to the left or to the right
//              */
//             const hasLeftSpill = startPage > 2;
//             const hasRightSpill = (totalPages - endPage) > 1;
//             const spillOffset = totalNumbers - (pages.length + 1);
//
//             switch (true) {
//                 // handle: (1) < {5 6} [7] {8 9} (10)
//                 case (hasLeftSpill && !hasRightSpill): {
//                      const  extraPages = range(startPage - spillOffset, startPage - 1);
//                     pages = [LEFT_PAGE, ...extraPages, ...pages];
//                     break;
//                 }
//
//                 // handle: (1) {2 3} [4] {5 6} > (10)
//                 case (!hasLeftSpill && hasRightSpill): {
//                     const extraPages = range(endPage + 1, endPage + spillOffset);
//                     pages = [...pages, ...extraPages, RIGHT_PAGE];
//                     break;
//                 }
//
//                 // handle: (1) < {4 5} [6] {7 8} > (10)
//                 case (hasLeftSpill && hasRightSpill):
//                 default: {
//                     pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
//                     break;
//                 }
//             }
//
//             return [1, ...pages, totalPages];
//
//         }
//
//         return range(1, totalPages);
//
//     }
//
//     render() {
//
//         if (!this.totalRecords || this.totalPages === 1) return null;
//
//         const { currentPage } = this.state;
//         const pages = this.fetchPageNumbers();
//
//         return (
//             <Fragment>
//                 <nav aria-label="Countries PaginationItems">
//                     <ul className="pagination">
//                         { pages.map((page, index) => {
//
//                             if (page === LEFT_PAGE) return (
//                                 <li key={index} className="page-item">
//                                     <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
//                                         <span aria-hidden="true">&laquo;</span>
//                                         <span className="sr-only">Previous</span>
//                                     </a>
//                                 </li>
//                             );
//
//                             if (page === RIGHT_PAGE) return (
//                                 <li key={index} className="page-item">
//                                     <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
//                                         <span aria-hidden="true">&raquo;</span>
//                                         <span className="sr-only">Next</span>
//                                     </a>
//                                 </li>
//                             );
//
//                             return (
//                                 <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
//                                     <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
//                                 </li>
//                             );
//
//                         }) }
//
//                     </ul>
//                 </nav>
//             </Fragment>
//         );
//
//     }
// }
//
// PaginationItems.propTypes = {
//     totalRecords: PropTypes.number.isRequired,
//     pageLimit: PropTypes.number,
//     pageNeighbours: PropTypes.number,
//     onPageChanged: PropTypes.func
// };
//
// export default PaginationItems;
//
// // import { PaginationItems } from "react-bootstrap";
// //
// //
// // class PaginationItems extends React.Component {
// //     constructor(props) {
// //         super(props);
// //
// //         this.state = {};
// //
// //     }
// //
// //     render() {
// //         let active = 1;
// //         let items = [];
// //         for (let number = 1; number <= 5; number++) {
// //             items.push(
// //                 <PaginationItems.Item key={number} active={number === active}>
// //                     {number}
// //                 </PaginationItems.Item>,
// //             );
// //         }
// //         console.log('items', items)
// //         return (
// //             <PaginationItems>{items}</PaginationItems>
// //         );
// //     }
// // }
// //
// // export default PaginationItems;