import axios from 'axios';
import { getTokenStatus } from './session';
import { StorageUtils, StorageKey } from './session';
import store from 'redux/configure-store';
import { changeTokenExpired } from 'redux/auth/reducers';

const AxiosClient = axios.create({
  baseURL: 'https://huydt.online',
  headers: {
    'Content-Type': 'application/json',
  },
});

// this is for authentication
const AxiosAuth = axios.create({
  baseURL: 'https://huydt.online/auth',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const publicUrls = ['/auth/sign-in'];

AxiosClient.interceptors.request.use((req) => {
  const session = StorageUtils.getObject(StorageKey.SESSION);
  const isValidToken = getTokenStatus();
  if (req.url && !publicUrls.includes(req.url) && !isValidToken) {
    store.dispatch(changeTokenExpired());
  } else if (session && req.headers && isValidToken) {
    req.headers['Authorization'] = `Bearer ${session.accessToken}`;
  }
  return req;
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    if (error?.response?.data?.data?.message) {
      throw error?.response?.data?.data?.message;
    } else {
      throw error?.message;
    }
  },
);

const get = <Reqtype, ResType>(
  url: string,
  params?: Reqtype,
  customHeaders?: any,
): Promise<ResType> => {
  return AxiosClient.get(url, { params, headers: customHeaders });
};

const post = <Reqtype, ResType>(
  url: string,
  data: Reqtype,
  customHeaders?: any,
): Promise<ResType> => {
  return AxiosClient.post(url, data, { headers: customHeaders });
};

const authPost = <Reqtype, ResType>(
  url: string,
  data: Reqtype,
  cusTomHeaders?: any,
): Promise<ResType> => {
  return AxiosAuth.post(url, data, { headers: cusTomHeaders });
};

async function put<Reqtype, ResType>(
  url: string,
  data: Reqtype,
  customHeaders?: any,
): Promise<ResType> {
  return AxiosClient.put(url, data, { headers: customHeaders });
}

async function _delete<Reqtype, Restype>(
  url: string,
  params?: Reqtype,
  customHeaders?: any,
): Promise<Restype> {
  return AxiosClient.delete(url, { params, headers: customHeaders });
}

async function f_delete<Reqtype, Restype>(
  url: string,
  data?: Reqtype,
  customHeaders?: any,
): Promise<Restype> {
  return AxiosClient.delete(url, { data: data, headers: customHeaders });
}

const AxiosUtils = { get, post, put, _delete, authPost, f_delete };
export default AxiosUtils;
