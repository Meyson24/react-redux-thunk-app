import {baseAPI} from './api'
import moment from "moment";
import {customHistory, store} from "../store";
import {getNewPairOfTokens} from "../actions/user";
import swal from 'sweetalert';

baseAPI.interceptors.response.use(response => response,
    async error => {
        const isAccessTokenExpired = error.response.data.message === "accessToken expired",
              isRefreshTokenExpired = error.response.data.message === "refreshToken expired";

        if (error.response.status === 401) {
            if (isAccessTokenExpired) {
                const refreshToken = localStorage.getItem('refreshToken'),
                    expiresIn = parseInt(localStorage.getItem('expiresIn'), 10),
                    timeNow = moment().unix(),
                    state = store.getState();
                const {user: {currentUser}} = state;

                if (expiresIn <= timeNow && currentUser.isAuthenticated) {
                    await store.dispatch(getNewPairOfTokens({refreshToken}));
                    return baseAPI.request(error.config);
                }
            } else if (isRefreshTokenExpired) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('expiresIn');

                swal("Wow! Error.", "Please authorize again", "error");

                return customHistory.push("/login")
            } else {
                return Promise.reject(error);
            }
        }
    });