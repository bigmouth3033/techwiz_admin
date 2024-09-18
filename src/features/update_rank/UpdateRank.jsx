import styled from "styled-components";
import { useState } from "react";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import TextInput from "@/shared/components/Input/TextInput";
import NumberInput from "@/shared/components/Input/NumberInput";
import Button1 from "@/shared/components/Button/Button1";
import { useSearchParams } from "react-router-dom";
import { getRankByIdRequest } from "./api/updateRankApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import notfound from "@/shared/assets/images/404.png";
import { useEffect } from "react";
import { updateRankRequest } from "./api/updateRankApi";

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: white;

  & span {
    color: red;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const RangeContainer = styled.div`
  > div {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* width: 50%; */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function UpdateRank() {
  let [searchParams, setSearchParams] = useSearchParams();
  const getRankById = getRankByIdRequest(searchParams.get("id"));
  const updateRank = updateRankRequest();
  const [name, setName] = useState("");
  const [minimum, setMiniMum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [errors, setErrors] = useState({});

  const [isError, setIsError] = useState();
  const [isSuccess, setIsSuccess] = useState();

  useEffect(() => {
    if (getRankById.isSuccess && getRankById.data.status == 200) {
      const data = getRankById.data.data;
      setName(data.name);
      setMiniMum(data.minimumSpending);

      if (data.maximumSpending >= 999999) {
        setMaximum(999999);
      } else {
        setMaximum(data.maximumSpending);
      }
    }
  }, [getRankById.status]);

  if (getRankById.isLoading) {
    return <WaitingPopUp />;
  }

  if (getRankById.isSuccess && getRankById.data.status == 404) {
    return (
      <Container>
        <NotFound>
          <img src={notfound} />
        </NotFound>
      </Container>
    );
  }

  const onCreateNewRank = (ev) => {
    ev.preventDefault();

    let isOk = true;

    if (!name) {
      setErrors((prev) => {
        return { ...prev, name: "Name cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, name: null };
      });
    }

    if (!minimum) {
      setErrors((prev) => {
        return { ...prev, minimum: "Minimum cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, minimum: null };
      });
    }

    if (minimum && maximum && Number(minimum) >= Number(maximum)) {
      setErrors((prev) => {
        return { ...prev, conflict: "Minimum cannot be larger than or equal to maximum" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, conflict: null };
      });
    }

    if (Number(minimum) > 999999 || Number(maximum) > 999999) {
      setIsError("Maximum for input is 999,999");
      return;
    }

    if (isOk) {
      const formData = new FormData();
      formData.append("id", getRankById.data.data.id);
      formData.append("name", name);
      formData.append("minimumSpending", Number(minimum));
      formData.append("MaximumSpending", Number(maximum));

      updateRank.mutate(formData, {
        onSuccess: (response) => {
          if (response.status == 403) {
            setIsError(response.message);
          }

          if (response.status == 200) {
            setIsSuccess(true);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <>
      <Container>
        <Form>
          <InputContainer>
            <label>
              Tier Name <span>*</span>
            </label>
            <TextInput state={name} setState={setName} />
          </InputContainer>
          {errors.name && <h5>{errors.name}</h5>}
          <RangeContainer>
            <p>Spending Range ($): </p>
            <InputContainer>
              <label>
                Minimum Spending <span>*</span>
              </label>
              <NumberInput state={minimum} setState={setMiniMum} />
              {errors.minimum && <h5>{errors.minimum}</h5>}
            </InputContainer>

            <InputContainer>
              <label>
                Maximum Spending <span>(Empty or 999999 for max)</span>
              </label>
              <NumberInput state={maximum} setState={setMaximum} />
              {errors.conflict && <h5>{errors.conflict}</h5>}
            </InputContainer>
          </RangeContainer>
          <ButtonContainer>
            <Button1 onClick={onCreateNewRank}>Save</Button1>
          </ButtonContainer>
        </Form>
      </Container>
      {isError && <ErrorPopUp message={isError} action={() => setIsError("")} />}
      {isSuccess && <SuccessPopUp message={"Success"} action={() => setIsSuccess(false)} />}
    </>
  );
}
