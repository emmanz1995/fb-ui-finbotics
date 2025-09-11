import axios from 'axios';

const buildHeaders = () => {
  return {
    headers: {
      'content-type': 'application/json',
    },
  };
};

export const onIngestFromRequisition = async (requisitionId: string | null) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/access/callback`,
      method: 'POST',
      data: {
        requisitionId,
      },
      ...buildHeaders(),
    });

    return response.data;
  } catch (err: any) {
    console.log('...err', err);
    throw new Error(err.message);
  }
};
