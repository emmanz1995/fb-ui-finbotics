import axios from 'axios';
import authHeader from '../../helpers/auth-header';

const AuthorizationHeader = authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWZhNzJiMy04ZTFmLTQ5ODYtODcyMS02YWQ2M2I4ODljYTkiLCJ1c2VybmFtZSI6ImVtbWFuejE5OTUiLCJpYXQiOjE3NjY3Nzg3NjIsImV4cCI6MTc2Njg2NDc2Mn0.zOXqE4W_K7qjTrOtXFvDVO7ZksfBbGZJV9jhfDZ60pM');
AuthorizationHeader['Content-Type'] = 'application/json';

export const onIngestAccountData = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/ingest`,
      method: 'POST',
      data: {
        accountId,
      },
      headers: AuthorizationHeader,
    });

    return response.data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const getAccountDetails = async () => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/get-accounts`,
      method: 'GET',
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWZhNzJiMy04ZTFmLTQ5ODYtODcyMS02YWQ2M2I4ODljYTkiLCJ1c2VybmFtZSI6ImVtbWFuejE5OTUiLCJpYXQiOjE3NjY3Nzg3NjIsImV4cCI6MTc2Njg2NDc2Mn0.zOXqE4W_K7qjTrOtXFvDVO7ZksfBbGZJV9jhfDZ60pM'),
    });

    return response.data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const getAccountDetailsByAccountId = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/get-account/${accountId}`,
      method: 'GET',
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWZhNzJiMy04ZTFmLTQ5ODYtODcyMS02YWQ2M2I4ODljYTkiLCJ1c2VybmFtZSI6ImVtbWFuejE5OTUiLCJpYXQiOjE3NjY3Nzg3NjIsImV4cCI6MTc2Njg2NDc2Mn0.zOXqE4W_K7qjTrOtXFvDVO7ZksfBbGZJV9jhfDZ60pM'),
    });

    console.log('...data', response?.data);
    
    return response.data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const getBalances = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/get-balance`,
      method: 'GET',
      params: {
        accountId,
      },
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWZhNzJiMy04ZTFmLTQ5ODYtODcyMS02YWQ2M2I4ODljYTkiLCJ1c2VybmFtZSI6ImVtbWFuejE5OTUiLCJpYXQiOjE3NjY3Nzg3NjIsImV4cCI6MTc2Njg2NDc2Mn0.zOXqE4W_K7qjTrOtXFvDVO7ZksfBbGZJV9jhfDZ60pM'),
    });
    return response.data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const getAllBalances = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/get-balance`,
      method: 'GET',
      headers: authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMWZhNzJiMy04ZTFmLTQ5ODYtODcyMS02YWQ2M2I4ODljYTkiLCJ1c2VybmFtZSI6ImVtbWFuejE5OTUiLCJpYXQiOjE3NjY3Nzg3NjIsImV4cCI6MTc2Njg2NDc2Mn0.zOXqE4W_K7qjTrOtXFvDVO7ZksfBbGZJV9jhfDZ60pM'),
      params: {
        accountId
      }
    });

    console.log(response.data);
    
    return response.data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const getTransactions = async (
  accountId: string,
  pagination?: { currentPage: number; limit: number }
) => {
  const searchParams = new URLSearchParams();
  searchParams.append('accountId', accountId);

  if (pagination?.currentPage !== undefined) {
    searchParams.append('currentPage', pagination?.currentPage.toString());
  }
  if (pagination?.limit !== undefined) {
    searchParams.append('limit', pagination?.limit.toString());
  }

  console.log('...searchParams', searchParams);
  try {
    const { data } = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/details/get-transactions`,
      method: 'GET',
      params: {
        searchParams,
      },
      headers: authHeader(''),
    });

    return data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};

export const onUpdateAccountDetails = async (id: string, ownerName: string) => {
  try {
    const { data } = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/account/${id}`,
      method: 'PUT',
      data: {
        ownerName,
      },
      headers: AuthorizationHeader,
    });

    return data;
  } catch (err: Error | unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof err.message === 'string' &&
      err.message !== ''
    ) {
      throw new Error(err.message);
    }
  }
};
