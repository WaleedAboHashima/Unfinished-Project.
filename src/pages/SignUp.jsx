import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, signUser } from "../features/userRegisterAuth";
import Loading from "./../components/Loading";

function SignUp() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const para = useRef();
  const modal = useRef();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");
  const newuserData = useSelector((state) => state.newuser);
  const isLoading = useSelector((state) => state.newuser.isLoading);
  /////////////////////////////////

  function handleClose() {
    modal.current.classList.add("hidden");
    dispatch(handleError());
  }
  const handleOpen = () => {
    modal.current.classList.remove("hidden");
  };

  const newUser = () => {
    dispatch(signUser({ email, username, password, confirmPass, phone }));
  };

  useEffect(() => {
    if (isLoading) {
      handleClose();
    } else {
      if (newuserData.error === 400) {
        para.current.textContent = "Please fill in all fields.";
        handleOpen();
      } else if (newuserData.status === 200) {
        para.current.textContent = "Password Doesn't Match";
        handleOpen();
      } else if (newuserData.status === 201) {
        para.current.textContent = `User Created! Welcome to the family ${newuserData.data.username}`;
        handleOpen();
      }
    }
    console.log(newuserData)
  });

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div
        ref={modal}
        className="loading-page hidden"
        onClick={() => handleClose()}
      >
        <div className="modal-content">
          <h2>Error.</h2>
          <hr />
          <p ref={para}></p>
        </div>
      </div>
      <motion.div
        className="login-container"
        initial={{ opacity: 0, transition: { duration: 0.5 } }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <div className="login-items">
          <form
            className="form-content"
            onSubmit={(e) => {
              e.preventDefault();
              //   getUser();
            }}
          >
            <header className="signup-header">
              <h2 style={{ fontSize: "30px" }}>Join our family!.</h2>
            </header>
            <div className="inputs-container">
              <input
                type="text"
                required
                className="inputs"
                placeholder="Full Name"
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <input
                type="email"
                className="inputs"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <input
                type="password"
                required
                className="inputs"
                placeholder="Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <input
                type="password"
                required
                className="inputs"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPass(e.currentTarget.value)}
              />
              <input
                type="text"
                className="inputs"
                required
                placeholder="Phone"
                onChange={(e) => setPhone(e.currentTarget.value)}
              />
            </div>
            <button className="login-button" onClick={() => newUser()}>
              Sign Up
            </button>
            <p>Already Have An Account?</p>
            <button
              onClick={() => {
                navigator("/login");
              }}
              className="signup-button"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default SignUp;
