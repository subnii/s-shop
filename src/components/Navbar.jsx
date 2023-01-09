import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsShop, BsPencil, BsCart } from "react-icons/bs";
import { login, logout, onLoginStateChange } from "../apis/firebase";

function Navbar() {
  const [user, setUser] = useState();

  const loginHandler = () => {
    login().then(setUser);
  };

  const logoutHandler = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onLoginStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <BsShop></BsShop>
        <h1 className="ml-1">S-Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {!user && <button onClick={loginHandler}>Login</button>}
        {user && <button onClick={logoutHandler}>Logout</button>}

        <Link to="/cart" className="text-2xl">
          <BsCart />
        </Link>
        <Link to="/product/add" className="text-2xl hidden">
          <BsPencil />
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
