import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import NavBar from "../../Reusables/NavBar/NavBar";
import Footer from "../../Reusables/Footer/Footer";
import { imagepaths } from "./imagepaths";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loader from "../../Reusables/Loader";
const Wrapper = styled.div`
  height: 600px;
  width: 85%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 100px auto;
  display: flex;
`;
const FlexBlock = styled.div`
  height: 100%;
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const DropdownWrapper = styled.div`
  height: 60px;
  width: 50%;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const DropdownHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const DropdownIcon = styled(AiFillCaretDown)`
  transition: all 0.2s ease-in;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0)")};
`;
const DropdownContent = styled.div`
  max-height: 120px;
  width: 100%;
  position: absolute;
  top: 80px;
  border-radius: 10px;
  transition: all 0.2s ease-in;
  transform: ${(props) => (props.open ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow-y: auto;
  background: white;
`;
const Nametabs = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d3d3d3;
`;
const ImageBlock = styled.div`
  height: 350px;
  width: 65%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ResetButton = styled.div`
  height: 40px;
  width: 150px;
  border: 2px solid #ff4433;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: #ff4433;
    color: white;
  }
`;
const Image = styled.div`
  height: 100%;
  width: 100%;
  background: url(${(props) => props.path});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Trialroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loggedUser);
  const qty = 1;
  const { products } = useSelector((state) => state.totalProducts);
  const [opendressdrop, setOpendressdrop] = useState(false);
  const [openmodeldrop, setOpenmodeldrop] = useState(false);
  const [dressimage, setDressimage] = useState("");
  const [modelimage, setModelimage] = useState("");
  const [dressname, setDressname] = useState("");
  const [modelname, setModelname] = useState("");
  const [resultimage, setResultimage] = useState("");
  const [currentproduct, setCurrentproduct] = useState(null);
  const [loading, setLoading] = useState();
  const tryonRef = useRef();
  const tryonFunc = () => {
    if (dressimage.includes("dress1") && modelimage.includes("model1")) {
      setResultimage(imagepaths[2].results.result1);
    }
    if (dressimage.includes("dress1") && modelimage.includes("model2")) {
      setResultimage(imagepaths[2].results.result2);
    }
    if (dressimage.includes("dress2") && modelimage.includes("model1")) {
      setResultimage(imagepaths[2].results.result3);
    }
    if (dressimage.includes("dress2") && modelimage.includes("model2")) {
      setResultimage(imagepaths[2].results.result4);
    }
    if (dressimage.includes("dress3") && modelimage.includes("model1")) {
      setResultimage(imagepaths[2].results.result5);
    }
    if (dressimage.includes("dress3") && modelimage.includes("model2")) {
      setResultimage(imagepaths[2].results.result6);
    }
    if (dressimage.includes("dress4") && modelimage.includes("model1")) {
      setResultimage(imagepaths[2].results.result7);
    }
    if (dressimage.includes("dress4") && modelimage.includes("model2")) {
      setResultimage(imagepaths[2].results.result8);
    }
    if (dressimage.includes("dress5") && modelimage.includes("model1")) {
      setResultimage(imagepaths[2].results.result9);
    }
    if (dressimage.includes("dress5") && modelimage.includes("model2")) {
      setResultimage(imagepaths[2].results.result10);
    }
  };
  tryonRef.current = tryonFunc;
  const clickHandler = () => {
    tryonRef.current();
  };
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item.image === dressimage);
      setCurrentproduct(product);
    }
  }, [dressimage]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [resultimage]);

  const navigatehandler = () => {
    navigate(`/singleproduct/${currentproduct._id}`);
  };
  return (
    <>
      <NavBar />
      <Wrapper>
        <FlexBlock>
          <DropdownWrapper>
            <DropdownHeader onClick={() => setOpendressdrop(!opendressdrop)}>
              {dressimage === "" ? <h3>Select Dress</h3> : <h3>{dressname}</h3>}
              <DropdownIcon size={28} open={opendressdrop} />
            </DropdownHeader>
            <DropdownContent open={opendressdrop}>
              {Object.keys(imagepaths[1].dresses).map((item, index) => {
                return (
                  <Nametabs
                    key={index}
                    onClick={() => {
                      setDressimage(imagepaths[1].dresses[item]);
                      setOpendressdrop(false);
                      setDressname(`Dress ${index + 1}`);
                    }}
                  >
                    <h4>Dress {index + 1}</h4>
                  </Nametabs>
                );
              })}
            </DropdownContent>
          </DropdownWrapper>
          <ImageBlock>
            {dressimage !== "" ? (
              <Image path={dressimage}></Image>
            ) : (
              <h3> No Image Selected</h3>
            )}
          </ImageBlock>

          <ResetButton onClick={() => setDressimage("")}>
            <h3>Reset</h3>
          </ResetButton>
        </FlexBlock>
        <FlexBlock>
          <DropdownWrapper>
            <DropdownHeader onClick={() => setOpenmodeldrop(!openmodeldrop)}>
              {modelimage === "" ? <h3>Select Model</h3> : <h3>{modelname}</h3>}
              <DropdownIcon size={28} open={openmodeldrop} />
            </DropdownHeader>
            <DropdownContent open={openmodeldrop}>
              {Object.keys(imagepaths[0].models).map((item, index) => {
                return (
                  <Nametabs
                    key={index}
                    onClick={() => {
                      setModelimage(imagepaths[0].models[item]);
                      setOpenmodeldrop(false);
                      setModelname(`Model ${index + 1}`);
                    }}
                  >
                    <h4>Model {index + 1}</h4>
                  </Nametabs>
                );
              })}
            </DropdownContent>
          </DropdownWrapper>
          <ImageBlock>
            {modelimage !== "" ? (
              <Image path={modelimage}></Image>
            ) : (
              <h3> No Image Selected</h3>
            )}
          </ImageBlock>{" "}
          <ResetButton onClick={() => setModelimage("")}>
            <h3>Reset</h3>
          </ResetButton>
        </FlexBlock>
        <FlexBlock>
          <h3 style={{ marginTop: "43px" }}>Results</h3>

          {!loading ? (
            <>
              <ImageBlock>
                {dressimage !== "" && modelimage !== "" ? (
                  <Image path={resultimage}></Image>
                ) : (
                  <h3> No Image Selected</h3>
                )}
              </ImageBlock>
            </>
          ) : (
            <Loader></Loader>
          )}
          <ButtonsWrapper>
            <ResetButton onClick={() => navigatehandler()}>
              <h4>Check Product</h4>
            </ResetButton>
            <ResetButton onClick={() => clickHandler()}>
              <h4>Try - On</h4>
            </ResetButton>
          </ButtonsWrapper>
        </FlexBlock>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Trialroom;
