const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signup(callback) {
        fakeAuthProvider.isAuthenticated = true;
        callback();
    },
    signout(callback) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
};

export { fakeAuthProvider };
