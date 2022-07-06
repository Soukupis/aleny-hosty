import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { getFirestoreCollectionData } from "../utils/firebaseUtils";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(null || Boolean(localStorage.getItem("auth")));
  const [currentUser, setCurrentUser] = useState(null || localStorage.getItem("username"))
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getUsers() {
    let users = [];
    await getFirestoreCollectionData("users").then((response) => {
      users = response;
    });
    return users;
  }

  const decideIfAdmin = (response, user) => {
    let admin = false;
    response.forEach((usr) => {
      if (user?.email === usr.username && usr.role === "ADMIN") {
        admin = true;
      }
    });
    return admin;
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const register = (email, pasword) => {
    return auth.createUserWithEmailAndPassword(email, pasword);
  };
  const logout = () => {
    return auth.signOut();
  };
  useEffect(() => {
    setLoading(true);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthentication(!!user);
      setCurrentUser(user)
      localStorage.setItem("auth", String(!!user))
      localStorage.setItem("username", user.email)
      getUsers().then((response) => {
        setIsAdmin(decideIfAdmin(response, user));
      });
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  const value = {
    authentication,
    currentUser,
    login,
    logout,
    register,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
