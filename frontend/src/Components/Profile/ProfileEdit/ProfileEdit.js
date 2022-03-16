import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProfileEdit.module.css";
import InputBox from "../../../Reusables/InputBox/InputBox";
import Buttons from "../../../Reusables/Buttons";
import {
  loginUser,
  updateLoggedUser,
} from "../../../Redux/actions/userActions";

const ProfileEdit = () => {
  const { user } = useSelector((state) => state.loggedUser);
  const { id } = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const UpdateHandler = () => {
    dispatch(updateLoggedUser(id, name, email));
  };
  return (
    <>
      <div className={styles.wrapper}>
        <h2>Edit Your Profile</h2>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <h4>Name : </h4>
            <div className={styles.inputBoxWrapper}>
              <InputBox state={name} changeHandler={setName} />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <h4>Email : </h4>
            <div className={styles.inputBoxWrapper}>
              <InputBox state={email} changeHandler={setEmail} />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <h4>Password : </h4>
            <div className={styles.inputBoxWrapper}>
              <InputBox state={password} changeHandler={setPassword} />
            </div>
          </div>

          <div style={{ margin: "30px 0" }}>
            <Buttons clickHandler={UpdateHandler}>
              <h4>Save Changes</h4>
            </Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
