import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Buttons from "../../../Reusables/Buttons";
import InputBox from "../../../Reusables/InputBox/InputBox";
import { loginUser } from "../../../Redux/actions/userActions";

const Login = ({ open }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = () => {
    dispatch(loginUser(email, password));
    navigate("/");
  };
  return (
    <div
      className={
        open
          ? `${styles.wrapper} ${styles.open}`
          : `${styles.wrapper} ${styles.close}`
      }
    >
      <h1>Welcome Back !</h1>
      <p>
        Login with your credentials <br /> to continue your journey with us
      </p>
      <div className={styles.inputBoxWrapper}>
        <InputBox placeholder="email" state={email} changeHandler={setEmail} />
      </div>
      <div className={styles.inputBoxWrapper}>
        <InputBox
          placeholder="password"
          state={password}
          changeHandler={setPassword}
        />
      </div>

      <Buttons clickHandler={submitHandler}>
        <h4 style={{ fontWeight: "600" }}>Login</h4>
      </Buttons>
    </div>
  );
};

export default Login;
