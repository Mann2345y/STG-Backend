import React, { useState } from "react";
import styles from "./Signup.module.css";
import Buttons from "../../../Reusables/Buttons";
import InputBox from "../../../Reusables/InputBox/InputBox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createUser, loginUser } from "../../../Redux/actions/userActions";

const Signup = ({ open }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confEmail, setConfEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = () => {
    dispatch(createUser(name, email, password));
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <h1>Welcome to Shop On The Go</h1>
      <p>
        Sign up with your credentials <br /> to begin your journey with us
      </p>
      <div className={styles.inputBoxWrapper}>
        <InputBox placeholder="name" state={name} changeHandler={setName} />
      </div>
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
      <div className={styles.inputBoxWrapper}>
        <InputBox
          placeholder="confirm password"
          state={confEmail}
          changeHandler={setConfEmail}
        />
      </div>
      <Buttons clickHandler={submitHandler}>
        <h4 style={{ fontWeight: "600" }}>Sign Up</h4>
      </Buttons>
    </div>
  );
};

export default Signup;
