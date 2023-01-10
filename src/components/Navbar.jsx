import React from "react";
import { Link } from "react-router-dom";
import { BsShop, BsPencil, BsCart } from "react-icons/bs";
import Button from "./Button";
import { useAuthContext } from "../context/AuthContext";

function User({ user: { photoURL, displayName } }) {
  return (
    <>
      <div className="flex items-center shrink-0">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={photoURL}
          alt={displayName}
        />
        <span className="hidden md:block">{displayName}님</span>
      </div>
    </>
  );
}

function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <BsShop></BsShop>
        <h1 className="ml-1">S-Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>

        {user ? (
          <>
            <Link to="/cart" className="text-2xl">
              <BsCart />
            </Link>
            {user.isAdmin && (
              <Link to="/product/add" className="text-2xl">
                <BsPencil />
              </Link>
            )}
            <User user={user}></User>
            <Button text="Logout" onClick={logout} />
          </>
        ) : (
          <Button text="Login" onClick={login}></Button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
