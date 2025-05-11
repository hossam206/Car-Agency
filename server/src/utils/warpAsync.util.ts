type func = (...args: any[]) => any;

export const warpASync = (func: func) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (error) {
      throw error;
    }
  };
};
