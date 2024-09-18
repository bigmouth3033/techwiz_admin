import { useState } from "react";
import styled, { css } from "styled-components";
import Avatar from "react-avatar";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  height: 40rem;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const ChatRoom = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem 10px;

  & > div {
    display: flex;
    flex-direction: column;

    & > span:nth-of-type(2) {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
    }
  }

  &:hover {
    background-color: #f7f6f6;
  }

  ${(props) => {
    if (props.$active) {
      return css`
        background-color: #e0e7ff;
        &:hover {
          background-color: #e0e7ff;
        }
      `;
    }
  }}
`;

export default function ChatSideBar({
  getChatRoom,
  chosenRoom,
  setChosenRoom,
  setChatRooms,
  chatRooms,
}) {
  useEffect(() => {
    if (getChatRoom.isSuccess) {
      setChatRooms(getChatRoom.data.data);
    }
  }, [getChatRoom.fetchStatus]);

  const onChangeRoom = (room) => {
    if (!chosenRoom) {
      setChosenRoom(room);
      return;
    }

    if (chosenRoom.customerId != room.customerId) {
      setChosenRoom(room);
    }
  };

  return (
    <Container>
      {chatRooms.map((item, index) => {
        return (
          <ChatRoom
            $active={chosenRoom && item.customer.id == chosenRoom.customer.id}
            onClick={() => onChangeRoom(item)}
            key={index}
          >
            <Avatar
              round
              size="50"
              name={item.customer.email}
              src={item.customer.avatar && getFirebaseImageUrl(item.customer.avatar)}
            />
            <div>
              <span> {item.customer.email}</span> <span>{item.messageContent}</span>
            </div>
          </ChatRoom>
        );
      })}
    </Container>
  );
}
