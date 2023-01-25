////////// Libraries //////////
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, handleError } from "../features/userLoginAuth";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import logo from "../images/logo.png";
import Loading from "../components/Loading";
import "./styles/Login.css";
import * as yup from "yup";

/////////////////////////////////////////
function Login() {

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const para = useRef();
  const modal = useRef();
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const userData = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const signIn = useSignIn();
  const schema = yup.object().shape({
    email: yup.string().email().required("Your Email is required."),
    phone: yup
      .number()
      .positive()
      .integer()
      .required()
      .typeError("Your phone number is required.")
      .test(
        "12345678910",
        "Invalid Number",
        (val) => val.toString().length === 10),
    password: yup.string().required("Password is Required.").min(5),
});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

/////////////// Functions //////////////////
  function handleClose() {
    modal.current.classList.add("hidden");
    dispatch(handleError());
  }
  const handleOpen = () => {
    modal.current.classList.remove("hidden");
  };
  const getUser = () => {
    dispatch(fetchUser({ email, phone, password }));
  };

  useEffect(() => {
    if (isLoading) {
      handleClose();
    } else {
      if (userData.error === 403) {
        para.current.textContent = "Check your credentials";
        handleOpen();
      } else if (userData.status === 200 && userData.data.roles !== 5050) {
        para.current.textContent = "No access";
        handleOpen();
      } else if (userData.status === 200 && userData.data.roles === 5050) {
        signIn({
          token: userData.data.token,
          expiresIn: 0.5,
          tokenType: "Bearer",
          authState: { email: email, phone: phone },
        });
        para.current.textContent = `Welcome back Mr. ${userData.data.username}`;
        navigator("/home");
      }
    }
  });
//////////////////////////////////////////////////
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
          <div className="image-postion">
            <img src={logo} alt="Logo" />
          </div>
          <form className="form-content" onSubmit={handleSubmit(getUser)}>
            <h2>Login to your account.</h2>
            <div className="inputs-container">
              <input
                type="text"
                className="inputs"
                placeholder="Email"
                {...register("email")}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <p className="error-para">{errors.email?.message}</p>
              <input
              
                type="number"
                className="inputs"
                {...register("phone")}
                placeholder="Phone"
                onChange={(e) => setPhone(e.currentTarget.value)}
              />
              <p className="error-para">{errors.phone?.message}</p>
              <input
                type="password"
                {...register("password")}
                className="inputs"
                placeholder="Password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <p className="error-para">{errors.password?.message}</p>
            </div>
            <div className="forget-password">
              <Link to={"/forget"}>Forgot Password?</Link>
            </div>
            <button onClick={()=> isLoading} className="login-button">
              Sign In
            </button>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
