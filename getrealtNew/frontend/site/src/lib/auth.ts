export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
};

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('admin_token', token);
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_token');
};
