import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillBookmarkPlusFill as Add } from "react-icons/bs";
import { IoTrashBinOutline as Trash } from "react-icons/io5";
import { AiOutlineEdit as Edit } from "react-icons/ai";
import InputBox from "../../../Reusables/InputBox/InputBox";
import Buttons from "../../../Reusables/Buttons";
import {
  addAddress,
  removeAddress,
} from "../../../Redux/actions/addressActions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  height: ${(props) =>
    props.item
      ? props.toggle
        ? "400px"
        : "110px"
      : props.toggle
      ? "350px"
      : "50px"};
  width: 95%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 25px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  overflow: hidden;
`;
const Header = styled.div`
  height: auto;
  width: auto;
`;
const AddAddressHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  margin-left: 25px;
`;
const AddressTabWrapper = styled.div`
  height: 110px;
  width: 95%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RightBlock = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background: #ff4433;
  }
`;
const FormWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 25px 25px 25px;
`;
const FormLeftBlock = styled.div`
  margin-right: 50px;
`;
const FormRightBlock = styled.div``;
const InputWrapper = styled.div`
  height: 40px;
  width: 250px;
  margin: 25px 0;
`;
const ButtonsWrapper = styled.div`
  width: 35%;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

const AddressForm = ({ item, short }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const [toggle, setToggle] = useState(false);
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
    }
  }, [item]);
  return (
    <Wrapper item={item} toggle={toggle}>
      <Header>
        {!item ? (
          <AddAddressHeader onClick={() => setToggle(!toggle)}>
            <Add size={21} />
            <h4 style={{ marginLeft: "15px" }}>Add New Address</h4>
          </AddAddressHeader>
        ) : (
          <AddressTabWrapper>
            <div>
              <h3>{item.address}</h3>
              <h5 style={{ marginTop: "5px" }}>
                {item.city}, {item.state}
              </h5>
              <h5 style={{ marginTop: "5px" }}>Pin Code - {item.pincode}</h5>
            </div>
            <RightBlock>
              <ButtonWrapper onClick={() => setToggle(!toggle)}>
                <Edit />
              </ButtonWrapper>
              <ButtonWrapper
                onClick={() => dispatch(removeAddress(user.id, item._id))}
              >
                <Trash />
              </ButtonWrapper>
            </RightBlock>
          </AddressTabWrapper>
        )}
      </Header>
      <FormWrapper>
        <div style={{ display: "flex" }}>
          <FormLeftBlock>
            <InputWrapper>
              <InputBox
                placeholder="Address"
                state={address}
                changeHandler={setAddress}
              />
            </InputWrapper>
            <InputWrapper>
              <InputBox
                placeholder="City"
                state={city}
                changeHandler={setCity}
              />
            </InputWrapper>
          </FormLeftBlock>
          <FormRightBlock>
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
          </FormRightBlock>
        </div>
        <ButtonsWrapper>
          <Buttons
            clickHandler={() =>
              dispatch(addAddress(user.id, address, city, state, pincode))
            }
          >
            <h4>Save Changes</h4>
          </Buttons>
          <Buttons clickHandler={() => setToggle(false)}>
            <h4>Cancel </h4>
          </Buttons>
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default AddressForm;
