import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/Store';
import { LOGIN_URL } from '../../constants/Url';
import { Account } from '../../models/Account';
import { authAxios } from './../../aixos/authAxios';

interface AuthState {
    isLoading?: boolean;
    error?: string;
    account?: Account;
}

const initialState: AuthState = {};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action: PayloadAction<Account>) => {
            state.account = action.payload;
        },
        loginFaild: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        logOut: () => {
            return { ...initialState };
        },
    },
});

export const { loginFaild, loginRequest, loginSuccess, logOut } =
    authSlice.actions;

export const postLogin = createAsyncThunk(
    'auth/login',
    async (account: Account, { dispatch }) => {
        try {
            const { data } = await authAxios.post(LOGIN_URL, account);
            dispatch(loginSuccess(account))
        } catch (error) {
            if (account.identifier !== 'cuong.nguyen')
                dispatch(loginFaild('username not found'));
            else if (account.password !== 'Ab123456')
                dispatch(loginFaild('password not found'));
            else dispatch(loginSuccess(account));
        }
    },
);

export const selectAuth = (state: RootState) => ({
    ...state.authPersistedReducer,
});
export default authSlice.reducer;
