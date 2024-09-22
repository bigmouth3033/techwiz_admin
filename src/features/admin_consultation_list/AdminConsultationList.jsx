import styled, { css } from "styled-components";
import { useState } from "react";
import { getAdminConsultationRequest } from "./api/adminConsultationApi";
import Button2 from "@/shared/components/Button/Button2";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import Pagination from "@/shared/components/Pagination/pagination";
import Avatar from "react-avatar";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { formatDate } from "@/shared/utils/DateTimeHandle";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";

const Container = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WaitingContainer = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: 5rem;
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

const EmailColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 5px;

    & span:nth-of-type(1) {
      font-weight: 500;
    }

    & span:nth-of-type(2) {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
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

const PermissionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > div {
    display: flex;
    gap: 1rem;
    /* margin: 10px 0; */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CustomButton2 = styled(Button2)`
  width: 80px;
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const HeaderButton = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s linear;
  border-bottom: 2px solid white;
  padding-bottom: 10px;

  ${(props) => {
    if (props.$active) {
      return css`
        border-bottom: 2px solid red;
      `;
    }
  }}
`;

export default function AdminConsultationList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("pending");
  const getAdminConsultation = getAdminConsultationRequest(currentPage, 10, status);
  const [approveConfirm, setApproveConfirm] = useState();
  const [denyConfirm, setDenyConfirm] = useState();

  return (
    <>
      <Container>
        <Header>
          <HeaderButton $active={status == "pending"} onClick={() => setStatus("pending")}>
            Pending
          </HeaderButton>
          <HeaderButton $active={status == "accepted"} onClick={() => setStatus("accepted")}>
            Accepted
          </HeaderButton>
          <HeaderButton $active={status == "denied"} onClick={() => setStatus("denied")}>
            Denied
          </HeaderButton>
        </Header>
        {getAdminConsultation.isLoading && (
          <WaitingContainer>
            <WaitingIcon />
          </WaitingContainer>
        )}

        <TableContent>
          <thead>
            <tr>
              <th>User</th>
              <th>Designer</th>
              <th>Schedule</th>
              <th>Address</th>
              <th>Note</th>
            </tr>
          </thead>

          <tbody>
            {getAdminConsultation.isSuccess &&
              getAdminConsultation.data.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <EmailColumn>
                        <Avatar
                          round
                          size="60"
                          name={item.customer.first_name}
                          src={getFirebaseImageUrl(item.customer.avatar)}
                        />
                        <div>
                          <span>{item.customer.first_name + " " + item.customer.last_name}</span>
                          <span>Contact {item.customer.contact_number} </span>
                        </div>
                      </EmailColumn>
                    </td>
                    <td>
                      <EmailColumn>
                        <Avatar
                          round
                          size="60"
                          name={item.designer.first_name}
                          src={getFirebaseImageUrl(item.designer.avatar)}
                        />
                        <div>
                          <span>{item.designer.first_name + " " + item.designer.last_name}</span>
                          <span>Contact {item.designer.contact_number} </span>
                        </div>
                      </EmailColumn>
                    </td>
                    <td>{formatDate(item.scheduled_datetime)} </td>
                    <td>{item.address}</td>
                    <td>{item.notes}</td>
                  </tr>
                );
              })}
          </tbody>
        </TableContent>

        <Footer>
          {getAdminConsultation.isSuccess && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={getAdminConsultation.data.totalPages}
            />
          )}
        </Footer>
      </Container>
      {approveConfirm && (
        <ConfirmPopUp
          cancel={() => setApproveConfirm()}
          confirm={() => onApprove(approveConfirm)}
          message={"confirm?"}
        />
      )}

      {denyConfirm && (
        <ConfirmPopUp
          cancel={() => setDenyConfirm()}
          confirm={() => onDeny(denyConfirm)}
          message={"confirm?"}
        />
      )}
    </>
  );
}
