import styled, { css } from "styled-components";
import { useState } from "react";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import { useRef } from "react";
import Avatar from "react-avatar";
import Button1 from "@/shared/components/Button/Button1";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaul_employee from "@/shared/assets/images/default_avatar.jpg";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { useNavigate } from "react-router-dom";
import TextEditor from "../product/components/TextEditor/TextEditor";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { registerNewDesignerRequest } from "./api/designerRegisterApi";

const Container = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;

  & span {
    color: red;
  }

  width: 80%;
  margin: auto;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  align-items: center;
  gap: 4rem;
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const Images = styled.div`
  > input {
    display: none;
  }
`;

const GenderDobContainer = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  align-items: center;
  gap: 3rem;
`;

const DatePickerStyled = styled(DatePicker)`
  padding: 0;
  margin: 0;
  outline: none;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    margin-bottom: 10px;
  }
  /* gap: 10px; */
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  gap: 1rem;

  > button {
    background-color: white;
    border: none;
    cursor: pointer;
  }
  margin-bottom: 1rem;
`;

const HeaderButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  ${(props) => {
    if (props.$active) {
      return css`
        border-bottom: 2px solid red;
      `;
    }
  }}
`;

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^[A-Za-z0-9]{6,}$/;

export default function DesignerRegister() {
  const registerNewDesigner = registerNewDesignerRequest();
  let fileRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [specialize, setSpecialize] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [year, setYear] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [isPortfolio, setIsPortfolio] = useState(false);

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const onClickSelectImage = (ev) => {
    ev.preventDefault();
    fileRef.current.click();
  };

  const handleImageChange = (ev) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    const maxFileSize = 1 * 1024 * 1024;

    if (ev.target.files.length > 0) {
      const isValidFileType = Array.from(ev.target.files).every((file) =>
        allowedFileTypes.includes(file.type)
      );

      const isValidFileSize = Array.from(ev.target.files).every((file) => file.size <= maxFileSize);

      if (!isValidFileType) {
        setImageError("Invalid file type. Please upload an image of type JPEG, PNG, GIF or JPG.");
        return;
      }

      if (!isValidFileSize) {
        setImageError("File size too large. Please upload an image smaller than 1 MB.");
        return;
      }

      setAvatar(ev.target.files[0]);
      setImageError(null);
      ev.target.value = null;
    }
  };

  const onCreateNewEmployee = (ev) => {
    ev.preventDefault();

    let isOk = true;

    if (!email) {
      setErrors((prev) => {
        return { ...prev, email: "Email cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, email: null };
      });
    }

    if (email && !EmailRegex.test(email)) {
      setErrors((prev) => {
        return { ...prev, email_pattern: "Wrong pattern of email" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, email_pattern: null };
      });
    }

    if (!password) {
      setErrors((prev) => {
        return { ...prev, password: "Password cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, password: null };
      });
    }

    if (password && password.length < 6) {
      setErrors((prev) => {
        return { ...prev, password_pattern: "Password need to be more than 6 characters" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, password_pattern: null };
      });
    }

    if (password && password != repeat) {
      setErrors((prev) => {
        return { ...prev, repeat: "Wrong password confirm" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, repeat: null };
      });
    }

    if (!firstName) {
      setErrors((prev) => {
        return { ...prev, firstName: "First name cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, firstName: null };
      });
    }

    if (!lastName) {
      setErrors((prev) => {
        return { ...prev, lastName: "Last Name cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, lastName: null };
      });
    }

    if (!phone) {
      setErrors((prev) => {
        return { ...prev, phone: "Phone cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, phone: null };
      });
    }

    if (!address) {
      setErrors((prev) => {
        return { ...prev, address: "Address cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, address: null };
      });
    }

    if (!specialize) {
      setErrors((prev) => {
        return { ...prev, specialize: "Specialize cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, specialize: null };
      });
    }

    if (!Number(year)) {
      setErrors((prev) => {
        return { ...prev, year: "Year cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, year: null };
      });
    }

    if (isOk) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("specialization", specialize);
      formData.append("year", year);
      formData.append("porfolio", portfolio);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      registerNewDesigner.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            setIsSuccess(true);
            return;
          }

          if (response.status == 403) {
            setAlert(response.message);
            return;
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans"],
      },
    });
  }, []);

  return (
    <>
      <Container>
        <Form>
          <LeftForm>
            <Header>
              <HeaderButton
                $active={!isPortfolio}
                onClick={(ev) => {
                  ev.preventDefault();
                  setIsPortfolio(false);
                }}
              >
                Designer information
              </HeaderButton>
              <HeaderButton
                $active={isPortfolio}
                onClick={(ev) => {
                  ev.preventDefault();
                  setIsPortfolio(true);
                }}
              >
                Porfolio
              </HeaderButton>
            </Header>
            {!isPortfolio ? (
              <DetailContainer>
                <InputContainer>
                  <label>
                    Email <span>*</span>
                  </label>
                  <TextInput state={email} setState={setEmail} />
                </InputContainer>
                {errors.email && <h5>{errors.email}</h5>}
                {errors.email_pattern && <h5>{errors.email_pattern}</h5>}

                <InputContainer>
                  <label>
                    Password <span>*</span>
                  </label>
                  <TextInput state={password} setState={setPassword} type={"password"} />
                </InputContainer>
                {errors.password && <h5>{errors.password}</h5>}
                {errors.password_pattern && <h5>{errors.password_pattern}</h5>}
                <InputContainer>
                  <label>
                    Password Repeat <span>*</span>
                  </label>
                  <TextInput state={repeat} setState={setRepeat} type={"password"} />
                </InputContainer>
                {errors.repeat && <h5>{errors.repeat}</h5>}
                <InputContainer>
                  <label>
                    First Name <span>*</span>
                  </label>
                  <TextInput state={firstName} setState={setFirstName} />
                </InputContainer>
                {errors.firstName && <h5>{errors.firstName}</h5>}
                <InputContainer>
                  <label>
                    Last Name <span>*</span>
                  </label>
                  <TextInput state={lastName} setState={setLastName} />
                </InputContainer>
                {errors.lastName && <h5>{errors.lastName}</h5>}
                <InputContainer>
                  <label>
                    Phone <span>*</span>
                  </label>
                  <NumberInput state={phone} setState={setPhone} />
                </InputContainer>
                {errors.phone && <h5>{errors.phone}</h5>}
                <InputContainer>
                  <label>
                    Address <span>*</span>
                  </label>
                  <TextInput state={address} setState={setAddress} />
                </InputContainer>
                {errors.address && <h5>{errors.address}</h5>}

                <InputContainer>
                  <label>
                    Specialization <span>*</span>
                  </label>
                  <TextInput state={specialize} setState={setSpecialize} />
                </InputContainer>
                {errors.specialize && <h5>{errors.specialize}</h5>}
                <InputContainer>
                  <label>
                    Year of Expirience <span>*</span>
                  </label>
                  <NumberInput state={year} setState={setYear} />
                </InputContainer>
                {errors.year && <h5>{errors.year}</h5>}
              </DetailContainer>
            ) : (
              <div>
                <TextEditor state={portfolio} setState={setPortfolio} />
              </div>
            )}

            <ButtonContainer>
              <Button1 onClick={(ev) => navigate("/login")}>Return to login page</Button1>
              <Button1 onClick={(ev) => onCreateNewEmployee(ev)}>Register as Designer</Button1>
            </ButtonContainer>
          </LeftForm>
          <RightForm>
            <Images>
              {!avatar ? (
                <div>
                  <Avatar round size="150" src={defaul_employee} />
                </div>
              ) : (
                <div>
                  <Avatar src={URL.createObjectURL(avatar)} round size="150" />
                </div>
              )}
              <input onChange={handleImageChange} type="file" ref={fileRef} />
            </Images>
            <p>Maximum file size 1 MB</p>
            <Button1 onClick={onClickSelectImage}>Select Avatar</Button1>
          </RightForm>
        </Form>
      </Container>

      {isSuccess && (
        <SuccessPopUp
          message={"Success, please wait for admin to response"}
          action={() => {
            setIsSuccess(false);
            navigate("/login");
          }}
        />
      )}
      {imageError && <ErrorPopUp message={imageError} action={() => setImageError("")} />}
      {alert && <AlertPopUp message={alert} action={() => setAlert("")} />}
    </>
  );
}
