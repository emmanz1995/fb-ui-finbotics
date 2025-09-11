import axios from 'axios';

const buildHeaders = () => {
  return {
    headers: {
      'content-type': 'application/json',
    },
  };
};

export const onIngestAccountData = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/account/ingest`,
      method: 'POST',
      data: {
        accountId,
      },
      ...buildHeaders(),
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getAccountDetails = async () => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/account/details`,
      method: 'GET',
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getBalances = async (accountId: string) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/account/balances`,
      method: 'GET',
      params: {
        accountId,
      },
      ...buildHeaders(),
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getTransactions = async (
  accountId: string,
  pagination?: { currentPage: number; limit: number }
) => {
  try {
    const { data } = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/account/transactions`,
      method: 'GET',
      params: {
        accountId,
        currentPage: pagination?.currentPage,
        limit: pagination?.limit,
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err.message);
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
      ...buildHeaders(),
    });

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
