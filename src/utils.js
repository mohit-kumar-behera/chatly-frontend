export const ENDPOINT_URL = 'https://chatly-server.herokuapp.com/'; // When in Production
// export const ENDPOINT_URL = 'http://localhost:8000'; // When running the APP locally (Node.js running on port 8000)

const LOCAL_STORAGE_KEY_NAME = 'chatlyState';

export const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, serializedState);
  } catch (e) {
    console.warn(e);
  }
};

export const fetchFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
