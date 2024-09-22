import styled, { css } from "styled-components";
import { useState } from "react";
import { getDesignerConsultationRequest } from "./api/designerConsultationApi";
import Button2 from "@/shared/components/Button/Button2";
import WaitingIcon from "@/shared/components/AnimationIcon/WaitingIcon";
import Pagination from "@/shared/components/Pagination/pagination";
import Avatar from "react-avatar";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { formatDate } from "@/shared/utils/DateTimeHandle";
import { aproveConsultationRequest } from "./api/designerConsultationApi";
import { denyConsultationRequest } from "./api/designerConsultationApi";
import ConfirmPopUp from "@/shared/components/PopUp/ConfirmPopUp";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import { getCustomerOrderListRequest } from "./api/designerConsultationApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  margin: 2rem;
  padding: 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Note = styled.textarea`
  padding: 8px;
  border-radius: 3px;
  width: 100%;
  width: 20rem;
  height: 10rem;

  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;

  &:focus {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }

  &:active {
    border: 1px solid rgba(0, 0, 255, 0.4);
  }
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

const XButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  > svg {
    transform: translate(100%, -90%);
    background-color: white;

    &:hover {
      background-color: white;
    }
  }
`;

const CustomPopUp = styled(PopUp)`
  margin: 0;
  padding: 1rem;
`;

export default function DesignerConsultation() {
  const navigate = useNavigate();
  const [note, setNote] = useState(false);
  const [isShowOrderList, setIsShowOrderList] = useState();
  const aproveConsultation = aproveConsultationRequest();
  const denyConsultation = denyConsultationRequest();
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("pending");
  const getDesignerConsultation = getDesignerConsultationRequest(currentPage, 10, status);
  const [approveConfirm, setApproveConfirm] = useState();
  const [denyConfirm, setDenyConfirm] = useState();

  const onApprove = (consultationId) => {
    const formData = new FormData();

    formData.append("consultationId", consultationId);

    aproveConsultation.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setApproveConfirm();
          getDesignerConsultation.refetch();
        }
      },
    });
  };

  const onDeny = (consultationId) => {
    const formData = new FormData();

    formData.append("consultationId", consultationId);

    denyConsultation.mutate(formData, {
      onSuccess: (response) => {
        if (response.status == 200) {
          setDenyConfirm();
          getDesignerConsultation.refetch();
        }
      },
    });
  };

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
        {getDesignerConsultation.isLoading && (
          <WaitingContainer>
            <WaitingIcon />
          </WaitingContainer>
        )}
        <TableContent>
          <thead>
            <tr>
              <th>User</th>
              <th>Schedule</th>
              <th>Address</th>
              <th>Order history</th>
              <th>Note</th>
              {status == "pending" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {getDesignerConsultation.isSuccess &&
              getDesignerConsultation.data.data.map((item, index) => {
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
                    <td>{formatDate(item.scheduled_datetime)} </td>
                    <td>{item.address}</td>
                    <td>
                      <Button2 onClick={() => setIsShowOrderList(item.user_id)}>History</Button2>
                    </td>
                    <td>
                      <Button2 onClick={() => setNote(item.notes)}>Show note</Button2>
                    </td>
                    {status == "pending" && (
                      <td>
                        <ButtonContainer>
                          <Button2 onClick={() => setApproveConfirm(item.id)}>Approve</Button2>
                          <Button2 onClick={() => setDenyConfirm(item.id)}>Deny</Button2>
                        </ButtonContainer>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </TableContent>
        <Footer>
          {getDesignerConsultation.isSuccess && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={getDesignerConsultation.data.totalPages}
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
      {note && (
        <CustomPopUp action={() => {}}>
          <XButtonContainer>
            <XButton action={() => setNote()} />
          </XButtonContainer>
          <Note>{note}</Note>
        </CustomPopUp>
      )}
      {isShowOrderList && <OrderPopUp action={() => setIsShowOrderList()} id={isShowOrderList} />}
    </>
  );
}

function OrderPopUp({ id, action }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const getCustomerOrderList = getCustomerOrderListRequest(currentPage, 10, id);

  return (
    <CustomPopUp action={action}>
      <TableContent>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {getCustomerOrderList.isSuccess &&
            getCustomerOrderList.data.data.map((item, index) => {
              return (
                <tr>
                  <td>
                    {item.user.userdetails.first_name + " " + item.user.userdetails.last_name}{" "}
                  </td>
                  <td>{item.user.userdetails.contact_number}</td>
                  <td>{item.user.userdetails.address}</td>
                  <td>{item.total}</td>
                  <td>{formatDate(item.created_date)}</td>
                  <td>{item.status}</td>
                  <td>
                    <Button2 onClick={() => navigate(`/order_detail?id=${item.id}`)}>
                      Detail
                    </Button2>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </TableContent>

      <Footer>
        {getCustomerOrderList.isSuccess && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={getCustomerOrderList.data.totalPages}
          />
        )}
      </Footer>
    </CustomPopUp>
  );
}