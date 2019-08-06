import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'

import {
    GET_ALL_BOOKS_REQUEST,
    GET_ALL_BOOKS_SUCCESS,
    GET_BOOK_BY_ID_REQUEST,
    GET_BOOK_BY_ID_SUCCESS,
    getBooks,
    getBookById,
} from './book'


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const baseURL = 'http://localhost:4000/';

describe('BooksActions', () => {

    describe('async actions', () => {

        afterEach(() => {
            fetchMock.reset();
            fetchMock.restore()
        });

        it('GET_ALL_BOOKS_SUCCESS when fetching books has been done', () => {

            fetchMock.get(`${baseURL}books/`, {
                headers: {'content-type': 'application/json'},
                body: {
                    books: [{id: 83, title: "Title 1", description: "Desc 1", price: "100"},
                        {id: 84, title: "Title 2", description: "Desc 2", price: "200"},
                        {id: 85, title: "Title 3", description: "Desc 3", price: "300"}],
                    pagination: {page: "1", per_page: "3", total: 11}
                },
            });

            const expectedActions = [
                {
                    type: GET_ALL_BOOKS_REQUEST,
                },
                {
                    type: GET_ALL_BOOKS_SUCCESS,
                    data: {
                        books: [{id: 83, title: "Title 1", description: "Desc 1", price: "100"},
                            {id: 84, title: "Title 2", description: "Desc 2", price: "200"},
                            {id: 85, title: "Title 3", description: "Desc 3", price: "300"}],
                        pagination: {page: "1", per_page: "3", total: 11}
                    },
                },
            ];

            const store = mockStore({});

            return store.dispatch(getBooks({page:1, per_page:3})).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });

        it('GET_BOOK_BY_ID_SUCCESS when fetching book has been done', () => {

            fetchMock.get(`${baseURL}books/83`, {
                headers: {'content-type': 'application/json'},
                body: {
                    description: "Desc 1",
                    price: "100",
                    title: "Title 1",
                },
            });

            const expectedActions = [
                {
                    type: GET_BOOK_BY_ID_REQUEST,
                },
                {
                    type: GET_BOOK_BY_ID_SUCCESS,
                    data: {
                        description: "Desc 1",
                        price: "100",
                        title: "Title 1",
                    },
                },
            ];

            const store = mockStore({});

            return store.dispatch(getBookById(83)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });

    })
});
