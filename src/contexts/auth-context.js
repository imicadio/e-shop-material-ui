import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { auth, ENABLE_AUTH } from "../lib/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    const authSkipped = globalThis.sessionStorage.getItem("skip-auth") === "true";

    if (authSkipped) {
      const user = {};

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
      return;
    }

    // Check if authentication with Zalter is enabled
    // If not, then set user as authenticated
    if (!ENABLE_AUTH) {
      const user = {};

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
      return;
    }

    try {
      // Check if user is authenticated
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user.json")
            .then((response) => response.json())
            .then((data) => {
              // console.log(user.uid);
              const isUser = Object.entries(data).filter(([key, value]) => value.id === user.uid);
              if (isUser.length < 1) return console.error("USER MISSING PLEASE LOGIN");

              const payloadUser = {
                id: user.uid,
                role: isUser[0][1].role,
              };

              dispatch({
                type: HANDLERS.INITIALIZE,
                payload: payloadUser,
              });
            })
            .catch((error) => console.error(error));
        } else {
          // console.log('User missing please login')
          dispatch({
            type: HANDLERS.INITIALIZE,
          });
        }
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  const signIn = (userData, email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user.json")
            .then((response) => response.json())
            .then((data) => {
              // console.log(user.uid);
              const isUser = Object.entries(data).filter(([key, value]) => value.email === email);
              if (isUser.length < 1) return console.error("USER MISSING PLEASE LOGIN");

              const payloadUser = {
                id: user.uid,
                role: isUser[0][1].role,
              };

              dispatch({
                type: HANDLERS.SIGN_IN,
                payload: payloadUser,
              });
            })
            .catch((error) => console.error(error));

        
      })
      .catch((error) => {
        console.error(error.message);
      });    
  };

  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.success("Signout successfully.");
      })
      .catch((error) => {
        console.error(error.message);
      });

    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
