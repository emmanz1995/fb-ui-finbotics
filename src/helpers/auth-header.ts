const authHeader = (token: string | null): { [key: string]: string } => {
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export default authHeader;
