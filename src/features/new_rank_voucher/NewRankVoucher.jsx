import styled from "styled-components";
import { useState } from "react";
import Button1 from "@/shared/components/Button/Button1";
import TextInput from "@/shared/components/Input/TextInput";
import DatePicker from "react-datepicker";
import { getAllRankRequest } from "../ranks/api/rankListApi";
import Select from "react-select";
import NumberInput from "@/shared/components/Input/NumberInput";
import { createNewVoucherRequest } from "./api/newVoucherApi";

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

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    margin-left: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InputSelect = styled(Select)`
  border-radius: 3px;

  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: all 0.3s;
  & * {
    cursor: pointer;
    outline: none !important;
    border: none !important;
  }
`;

export default function NewRankVoucher() {
  const createNewVoucher = createNewVoucherRequest();

  const [code, setCode] = useState("");
  const [ranks, setRanks] = useState();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [percent, setPercent] = useState();
  const [minimum, setMinimum] = useState();
  const [total, setTotal] = useState();
  const getAllRank = getAllRankRequest();
  const [errors, setErrors] = useState({});

  const onSaveVoucher = (ev) => {
    ev.preventDefault();

    let isOk = true;

    if (!code) {
      setErrors((prev) => {
        return { ...prev, code: "Code cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, code: null };
      });
    }

    if (!ranks || (ranks && ranks.length == 0)) {
      setErrors((prev) => {
        return { ...prev, rank: "Rank cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, rank: null };
      });
    }

    if (start >= end) {
      setErrors((prev) => {
        return { ...prev, time: "Start date cant not be larger or equal to Enddate" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, time: null };
      });
    }

    if (!Number(percent)) {
      setErrors((prev) => {
        return { ...prev, percent: "Percent cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, percent: null };
      });
    }

    if (percent && percent >= 100) {
      setErrors((prev) => {
        return { ...prev, wrong_percent: "Percent cannot be 100 or larger" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, wrong_percent: null };
      });
    }

    if (!Number(minimum)) {
      setErrors((prev) => {
        return { ...prev, minimum: "Minimum transaction cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, minimum: null };
      });
    }

    if (!Number(total)) {
      setErrors((prev) => {
        return { ...prev, total: "Total cannot be empty" };
      });
      isOk = false;
    } else {
      setErrors((prev) => {
        return { ...prev, total: null };
      });
    }

    if (isOk) {
      const formData = new FormData();

      formData.append("uniqueCode", code);
      formData.append("startDate", start.toISOString());
      formData.append("endDate", end.toISOString());
      formData.append("salePercent", percent);
      formData.append("amount", total);
      formData.append("mimimumAvailable", minimum);
      for (let item of ranks) {
        formData.append("rankIds", item.value);
      }

      createNewVoucher.mutate(formData, {
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <Container>
      <Form>
        <InputContainer>
          <label>
            Voucher Code <span>*</span>
          </label>
          <TextInput state={code} setState={setCode} />
        </InputContainer>
        {errors.code && <h5>{errors.code}</h5>}
        <InputContainer>
          <label>
            Selected Rank <span>*</span>
          </label>
          <InputSelect
            value={ranks}
            onChange={setRanks}
            isMulti
            options={
              getAllRank.isSuccess &&
              getAllRank.data.data
                .filter((item) => item.isActive)
                .map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })
            }
          />
        </InputContainer>
        {errors.rank && <h5>{errors.rank}</h5>}
        <DateContainer>
          <label>
            Active Time <span>*</span>
          </label>
          <div>
            <p>From</p>
            <DatePicker
              selected={start}
              onChange={setStart}
              showIcon
              preventOpenOnFocus
              showTimeSelect
              showTimeInput
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div>
            <p>To</p>
            <DatePicker
              selected={end}
              onChange={setEnd}
              showIcon
              preventOpenOnFocus
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </DateContainer>
        {errors.time && <h5>{errors.time}</h5>}
        <InputContainer>
          <label>
            Sale Percent (%) <span>*</span>
          </label>
          <NumberInput state={percent} setState={setPercent} />
        </InputContainer>
        {errors.percent && <h5>{errors.percent}</h5>}
        {errors.wrong_percent && <h5>{errors.wrong_percent}</h5>}
        <InputContainer>
          <label>
            Minimum purchase requirement ($) <span>*</span>
          </label>
          <NumberInput state={minimum} setState={setMinimum} />
        </InputContainer>
        {errors.minimum && <h5>{errors.minimum}</h5>}
        <InputContainer>
          <label>
            Total amount of voucher <span>*</span>
          </label>
          <NumberInput state={total} setState={setTotal} />
        </InputContainer>
        {errors.total && <h5>{errors.total}</h5>}
        <ButtonContainer>
          <Button1 onClick={onSaveVoucher}>Save</Button1>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
