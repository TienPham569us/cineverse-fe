export const getAuthToken = (name: string) => {
  if (typeof window === 'undefined') {
    return undefined;
  }
  
  const token = localStorage.getItem(name);

  if (!token) {
    return undefined;
  }

  return Buffer.from(token, 'base64').toString('ascii');
}

export const getValidAuthToken = () => {
  const token = getAuthToken('auth_token');

  if (!token) {
    return undefined;
  }

  return token;
}