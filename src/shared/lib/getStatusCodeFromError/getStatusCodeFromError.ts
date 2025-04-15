export const getStatusCodeFromError = (errorString: string) => {
  const parts = errorString.split(' ');

  const statusCode = parts.find((part) => /^\d{3}$/.test(part));

  return statusCode ? parseInt(statusCode, 10) : 0;
};
