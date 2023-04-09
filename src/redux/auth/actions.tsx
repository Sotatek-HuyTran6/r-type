import React from 'react';
import { AppDispatch } from 'types/redux';
import AxiosUtils from 'utils/axios-utils';
import { getAuthSuccess, getAuthFailure, getAuthLoading, getMyInfo } from './reducers';
import { API } from 'redux/api-route';
import { getTokenStatus, setSession, StorageKey, StorageUtils } from 'utils/session';
import { NavigateFunction } from 'react-router-dom';
import { paths } from 'routes/routes';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const client_secret = '11UJJdC8M4fx3C7YzdlD2X9ruVcC9W3j';
const client_id = 'backend';

export type Account = {
  username?: string;
  password?: string;
  grant_type: string;
};

export const login =
  (account: Account, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    try {
      dispatch(getAuthLoading());
      const res: any = await AxiosUtils.authPost(API.signin, {
        ...account,
        client_id,
        client_secret,
      });
      const token = res?.data.access_token;
      const refreshToken = res?.data.refresh_token;
      setSession({
        accessToken: token,
        refreshToken: refreshToken,
      });

      const user: any = await AxiosUtils.get(
        API.me,
        {},
        {
          Authorization: `Beaer ${token}`,
        },
      );
      dispatch(getMyInfo(user.data));

      dispatch(getAuthSuccess(token));
      navigate(paths.home);
    } catch (err) {
      dispatch(getAuthFailure(err));
      toast.success('Login failed!', {
        icon: () => {
          return <CheckCircleIcon sx={{ color: '#e74c3c' }} />;
        },
      });
    }
  };

export const refresh = (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAuthLoading());
    const session: any = StorageUtils.getObject(StorageKey.SESSION);
    const isValidToken = getTokenStatus();

    if (isValidToken) {
      const res: any = await AxiosUtils.authPost(API.signin, {
        grant_type: 'refresh_token',
        refresh_token: session.refreshToken,
        client_id,
        client_secret,
      });
      const token = res?.data.access_token;
      const refreshToken = res?.data.refresh_token;
      setSession({
        accessToken: token,
        refreshToken: refreshToken,
      });

      const user: any = await AxiosUtils.get(
        API.me,
        {},
        {
          Authorization: `Beaer ${token}`,
        },
      );

      dispatch(getMyInfo(user.data));

      dispatch(getAuthSuccess(token));
    } else {
      navigate('/signin');
    }
  } catch (err) {
    dispatch(getAuthFailure(err));
    navigate('/signin');
  }
};
