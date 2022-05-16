import * as React from "react";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import './App.css'

import storage, { USERS_KEY, CURRENT_USER_KEY } from "./storage";

export default function App() {
    return (
        <div className="App">
            <AuthProvider >
                <h1>Auth Example</h1>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<PublicPage />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route
                            path="/protected"
                            element={
                                <RequireAuth>
                                    <ProtectedPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

function Layout() {
    return (
        <div>
            <AuthStatus />

            <ul>
                <li>
                    <Link to="/">Recipes</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li>
                    <Link to="/protected">Protected Page</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
}
let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
    const initialUsers = storage.get(USERS_KEY, []);
    const curentUser = storage.get(CURRENT_USER_KEY, null);
    const [user, setUser] = React.useState(curentUser);
    const [users, setUsers] = React.useState(initialUsers);

    React.useEffect(() => storage.set(CURRENT_USER_KEY, user), [user]);

    React.useEffect(() => storage.set(USERS_KEY, users), [users]);

    let signUp = (newUser, callback) => {
        return fakeAuthProvider.signup(() => {
            setUsers(oldUsers => [...oldUsers, newUser]);
            setUser(newUser);
            callback();
        })
    };

    let signIn = (newUser, callback) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signOut = (callback) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = { user, signUp, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
}

function AuthStatus() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth.user) {
        return <p>You are not logged in.</p>;
    }

    return (
        <p>
            Welcome {auth.user}!{" "}
            <button
                onClick={() => {
                    auth.signOut(() => navigate("/"));
                }}
            >
                Sign out
            </button>
        </p>
    );
}

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate()

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location }} />;
        // navigate("/login", {state: { from: location } })
    }

    return children;
}

function SignUp() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username");

        auth.signUp(username, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
    }

    return (
        <div>
            <p>You must log in to view the page at {from}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" />
                </label>{" "}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

function SignIn() {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("username");

        auth.signIn(username, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
    }

    return (
        <div>
            <p>You must log in to view the page at {from}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input name="username" type="text" />
                </label>{" "}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}
