import { useState } from "react";
import styled, { css } from "styled-components";
import { getDesignerProfileRequest } from "./api/designerProfileApi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import Button1 from "@/shared/components/Button/Button1";
import Avatar from "react-avatar";
import defaul_employee from "@/shared/assets/images/default_avatar.jpg";
import TextEditor from "../product/components/TextEditor/TextEditor";
import { useEffect } from "react";
import InputCheckBox from "@/shared/components/Input/InputCheckBox";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { updateInfoDesignerRequest } from "./api/designerProfileApi";
import { updateDowDesignerRequest } from "./api/designerProfileApi";
import { updatePortfolioRequest } from "./api/designerProfileApi";
import { updateDesignerAvatarRequest } from "./api/designerProfileApi";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { adminRequest } from "@/shared/api/adminApi";

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

const DateOfWorkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;

  & p {
    margin: 0;
    padding: 0;
  }

  > div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DesignerProfile() {
  const updateInfoDesigner = updateInfoDesignerRequest();
  const updateDowDesigner = updateDowDesignerRequest();
  const updatePortfolio = updatePortfolioRequest();
  const updateDesignerAvatar = updateDesignerAvatarRequest();
  const getDesignerProfile = getDesignerProfileRequest();
  const admin = adminRequest();

  let fileRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [specialize, setSpecialize] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();
  const [year, setYear] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [headerButton, setHeaderButton] = useState("info");

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const [dow, setDow] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const onUpdatePorfolio = () => {
    const formData = new FormData();

    formData.append("portfolio", portfolio);

    updatePortfolio.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          getDesignerProfile.refetch();
          setIsSuccess(true);
        }
      },
    });
  };

  const onUpdateDow = () => {
    const formData = new FormData();

    let dowArr = [];

    for (let day in dow) {
      if (dow[day] == true) {
        dowArr.push(day);
      }
    }

    dowArr = dowArr.join("-");

    formData.append("dow", dowArr ? dowArr : "-");

    updateDowDesigner.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setIsSuccess(true);
        }
      },
    });
  };

  const onUpdateInfo = (ev) => {
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

      formData.append("Id", getDesignerProfile.data.data.id);
      formData.append("FirstName", firstName);
      formData.append("LastName", lastName);
      formData.append("Phone", phone);
      formData.append("Address", address);
      formData.append("Specialization", specialize);
      formData.append("Year", year);

      updateInfoDesigner.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            admin.refetch();
            getDesignerProfile.refetch();
            setIsSuccess(true);
          }
        },
      });
    }
  };

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

      const formData = new FormData();

      formData.append("avatar", ev.target.files[0]);

      updateDesignerAvatar.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 200) {
            getDesignerProfile.refetch();
            admin.refetch();
          }
        },
      });
      setImageError(null);
      ev.target.value = null;
    }
  };

  useEffect(() => {
    if (getDesignerProfile.isSuccess) {
      const data = getDesignerProfile.data.data;
      setEmail(data.user.email);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setPhone(data.contact_number);
      setAddress(data.address);
      setSpecialize(data.specialization);
      setYear(data.yearsofexperience);
      setPortfolio(data.portfolio);

      const dowQuery = data.daywork.split("-");

      for (let item of dowQuery) {
        setDow((prev) => {
          return { ...prev, [item]: true };
        });
      }
    }
  }, [getDesignerProfile.fetchStatus]);

  return (
    <>
      <Container>
        <Form>
          <LeftForm>
            <Header>
              <HeaderButton
                $active={headerButton == "info"}
                onClick={(ev) => {
                  ev.preventDefault();
                  setHeaderButton("info");
                }}
              >
                Designer information
              </HeaderButton>
              <HeaderButton
                $active={headerButton == "portfolio"}
                onClick={(ev) => {
                  ev.preventDefault();
                  setHeaderButton("portfolio");
                }}
              >
                Porfolio
              </HeaderButton>
              <HeaderButton
                $active={headerButton == "dow"}
                onClick={(ev) => {
                  ev.preventDefault();
                  setHeaderButton("dow");
                }}
              >
                Day of work
              </HeaderButton>
            </Header>
            {headerButton == "info" && (
              <>
                <DetailContainer>
                  <InputContainer>
                    <label>Email</label>
                    <TextInput state={email} />
                  </InputContainer>
                  {errors.email && <h5>{errors.email}</h5>}
                  {errors.email_pattern && <h5>{errors.email_pattern}</h5>}
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
                <ButtonContainer>
                  <Button1 onClick={(ev) => onUpdateInfo(ev)}>Save</Button1>
                </ButtonContainer>
              </>
            )}

            {headerButton == "portfolio" && (
              <>
                <div>
                  <TextEditor state={portfolio} setState={setPortfolio} />
                </div>
                <ButtonContainer>
                  <Button1 onClick={(ev) => onUpdatePorfolio(ev)}>Save</Button1>
                </ButtonContainer>
              </>
            )}

            {headerButton == "dow" && (
              <>
                <DateOfWorkContainer>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Mon: !prev.Mon };
                        })
                      }
                      checked={dow.Mon}
                    />
                    <p>Monday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Tue: !prev.Tue };
                        })
                      }
                      checked={dow.Tue}
                    />
                    <p>Tuesday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Wed: !prev.Wed };
                        })
                      }
                      checked={dow.Wed}
                    />
                    <p>Wednesday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Thu: !prev.Thu };
                        })
                      }
                      checked={dow.Thu}
                    />
                    <p>Thursday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Fri: !prev.Fri };
                        })
                      }
                      checked={dow.Fri}
                    />
                    <p>Friday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Sat: !prev.Sat };
                        })
                      }
                      checked={dow.Sat}
                    />
                    <p>Saturday</p>
                  </div>
                  <div>
                    <InputCheckBox
                      onChange={() =>
                        setDow((prev) => {
                          return { ...prev, Sun: !prev.Sun };
                        })
                      }
                      checked={dow.Sun}
                    />
                    <p>Sunday</p>
                  </div>
                </DateOfWorkContainer>
                <ButtonContainer>
                  <Button1 onClick={(ev) => onUpdateDow(ev)}>Save</Button1>
                </ButtonContainer>
              </>
            )}
          </LeftForm>
          <RightForm>
            <Images>
              <div>
                <Avatar
                  src={
                    getDesignerProfile.isSuccess
                      ? getFirebaseImageUrl(getDesignerProfile.data.data.avatar)
                      : defaul_employee
                  }
                  round
                  size="150"
                />
              </div>

              <input onChange={handleImageChange} type="file" ref={fileRef} />
            </Images>
            <p>Maximum file size 1 MB</p>
            <Button1 onClick={onClickSelectImage}>Select Avatar</Button1>
          </RightForm>
        </Form>
      </Container>
      {isSuccess && <SuccessPopUp message={"success"} action={() => setIsSuccess()} />}
    </>
  );
}
