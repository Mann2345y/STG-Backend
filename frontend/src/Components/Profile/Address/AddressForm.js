import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputBox from "../../../Reusables/InputBox/InputBox";
import Buttons from "../../../Reusables/Buttons";
import { addAddress } from "../../../Redux/actions/addressActions";
import { useDispatch, useSelector } from "react-redux";

const FormWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
`;

const InputWrapper = styled.div`
  margin-bottom: 25px;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  @media (min-width: 400px) {
    width: 300px;
  }
`;

const AddressForm = ({ item, setToggleEdit }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { addresses } = useSelector((state) => state.addresses);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (item) {
      setAddress(item.address);
      setCity(item.city);
      setState(item.state);
      setPincode(item.pincode);
    } else {
      setAddress("");
      setCity("");
      setState("");
      setPincode("");
    }
    console.log(item);
  }, []);

  return (
    <>
      <FormWrapper>
        <InputWrapper>
          <InputBox
            placeholder="Address"
            state={address}
            changeHandler={setAddress}
          />
        </InputWrapper>
        <InputWrapper>
          <InputBox placeholder="City" state={city} changeHandler={setCity} />
        </InputWrapper>
        <InputWrapper>
          <InputBox
            placeholder="State"
            state={state}
            changeHandler={setState}
          />
        </InputWrapper>
        <InputWrapper>
          <InputBox
            placeholder="Pin Code"
            state={pincode}
            changeHandler={setPincode}
          />
        </InputWrapper>
        <ButtonsWrapper>
          <Buttons
            clickHandler={() => {
              dispatch(addAddress(user.id, address, city, state, pincode));
              setToggleEdit(false);
            }}
          >
            <p>Save Changes</p>
          </Buttons>
          {addresses.length > 0 && (
            <Buttons clickHandler={() => setToggleEdit(false)}>
              <p>Cancel </p>
            </Buttons>
          )}
        </ButtonsWrapper>
      </FormWrapper>
    </>
  );
};

export default AddressForm;
