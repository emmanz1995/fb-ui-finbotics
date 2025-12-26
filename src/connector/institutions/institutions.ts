import axios from 'axios';

const { VITE_API_URL_ACCOUNTS } = import.meta.env;

export const fetchInstitutions = async (pagination: {
  currentPage: number;
  limit: number;
}) => {
  let data;
  const url = new URL(`${VITE_API_URL_ACCOUNTS}/api/v1/institutions`);
  const params = url.searchParams;

  params.append('page', pagination.currentPage.toString());
  params.append('limit', pagination.limit.toString());

  try {
    ({ data } = await axios({
      url: url.toString(),
      method: 'GET',
    }));
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

  return data;
};
