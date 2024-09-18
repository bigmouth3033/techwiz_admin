import { useState } from "react";
import styled from "styled-components";
import { getAllRankRequest } from "./api/rankListApi";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import Button2 from "@/shared/components/Button/Button2";
import { useNavigate } from "react-router-dom";
import { changeRankActiveRequest } from "./api/rankListApi";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";
import AlertPopUp from "@/shared/components/PopUp/AlertPopUp";

const Container = styled.div`
  padding: 2rem;
  margin: 2rem;
  background-color: white;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 700px;
  overflow-x: scroll;
  font-size: 0.9em;
  overflow: hidden;

  thead tr {
    /* background-color: #0091ea; */
    /* color: #ffffff; */
    border-bottom: 3px solid #eeeff4;
    text-align: left;
    font-weight: bold;
  }

  th,
  td {
    padding: 18px 15px;
  }

  tbody tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

const WaitingContainer = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Active = styled.span`
  &::before {
    background-color: red;
    border-color: #78d965;
    box-shadow: 0px 0px 6px 1.5px #94e185;
    content: " ";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 12px;
    border: 1px solid #000;
    border-radius: 10px;
  }
`;

const Deactive = styled.span`
  &::before {
    background-color: #ffc182;
    border-color: #ffb161;
    box-shadow: 0px 0px 6px 1.5px #ffc182;
    content: " ";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 12px;
    border: 1px solid #000;
    border-radius: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default function RankList() {
  const changeRankActive = changeRankActiveRequest();
  const getAllRank = getAllRankRequest();
  const navigate = useNavigate();
  const [checkConfirm, setCheckConfirm] = useState();
  const [alert, setAlert] = useState();

  const onChangeRankActive = (rankId) => {
    const formData = new FormData();
    formData.append("rankId", rankId);

    changeRankActive.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 403) {
          setCheckConfirm(null);
          setAlert(response.message);
        }

        if (response.status == 200) {
          setCheckConfirm(null);
          getAllRank.refetch();
        }
      },
    });
  };

  return (
    <>
      <Container>
        {getAllRank.isLoading && (
          <WaitingContainer>
            <WaitingIcon />
          </WaitingContainer>
        )}

        <TableContent>
          <thead>
            <tr>
              <th>Rank name</th>
              <th>Mininum Spending</th>
              <th>Maximum Spending</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllRank.isSuccess &&
              getAllRank.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>${item.minimumSpending}</td>
                    <td>${item.maximumSpending > 999999 ? "MAX" : item.maximumSpending}</td>
                    <td>
                      {item.isActive ? <Active>Active</Active> : <Deactive>Inactive </Deactive>}
                    </td>
                    <td>
                      <ButtonContainer>
                        <Button2 onClick={() => navigate("/update_rank?id=" + item.id)}>
                          Update
                        </Button2>
                        <Button2 onClick={() => setCheckConfirm(item.id)}>
                          {item.isActive ? "Deactivate" : "Activate"}
                        </Button2>
                      </ButtonContainer>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </TableContent>
      </Container>
      {alert && <AlertPopUp message={alert} action={() => setAlert("")} />}
      {checkConfirm && (
        <ConfirmPopUp
          cancel={() => setCheckConfirm(null)}
          confirm={() => onChangeRankActive(checkConfirm)}
          message={"Confirm?"}
        />
      )}
    </>
  );
}
