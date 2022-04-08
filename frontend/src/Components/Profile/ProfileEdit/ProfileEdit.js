import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack as Back } from "react-icons/bi";
import styles from "./ProfileEdit.module.css";
import InputBox from "../../../Reusables/InputBox/InputBox";
import Buttons from "../../../Reusables/Buttons";
import { updateLoggedUser } from "../../../Redux/actions/userActions";
import { useNavigate } from "react-router";

const ProfileEdit = ({ tabsHandler }) => {
  const navigate = useNavigate();
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
            <InputBox state={name} changeHandler={setName} />
          </div>
          <div className={styles.inputWrapper}>
            <h4>Email : </h4>
            <InputBox state={email} changeHandler={setEmail} />
          </div>
          <div className={styles.inputWrapper}>
            <h4>Password : </h4>
            <InputBox state={password} changeHandler={setPassword} />
          </div>
          <div className={styles.profilebuttons}>
            <Buttons clickHandler={UpdateHandler}>
              <h4>Save Changes</h4>
            </Buttons>
            <div className={styles.backbutton}>
              {window.innerWidth > 1080 && (
                <Buttons clickHandler={tabsHandler}>
                  <h4>Back</h4>
                </Buttons>
              )}
              {window.innerWidth < 1080 && (
                <Buttons clickHandler={() => navigate("/profile")}>
                  <h4>Back</h4>
                </Buttons>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
