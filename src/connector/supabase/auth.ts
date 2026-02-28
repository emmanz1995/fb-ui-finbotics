import { supabaseClient } from '../../lib';

export const onLogin = async (payload: { email: string; password: string }) => {
  console.log(payload);

  let client;

  try {
    client = await supabaseClient.auth.signInWithPassword(payload);

    localStorage.setItem(
      'token',
      JSON.stringify(client.data.session?.access_token)
    );
  } catch (err: any) {
    throw new Error(err);
  }

  return client;
};
