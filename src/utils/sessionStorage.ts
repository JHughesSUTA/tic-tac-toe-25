export const setItem = (key: string, value: unknown) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("error storing to session storage", error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.sessionStorage.getItem(key);
    return item !== null ? JSON.parse(item) : undefined;
  } catch (error) {
    console.log("error getting session storage", error);
  }
};
