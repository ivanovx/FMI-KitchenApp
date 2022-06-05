export const CURRENT_USER_KEY = "user";
export const USERS_KEY = "users";
export const RECIPES_KEY = "recipes";

const storage = {
    get(key, defaultValue = undefined) {
        const value = window.localStorage.getItem(key);
        
        return value ? JSON.parse(value) : defaultValue;
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

export default storage;