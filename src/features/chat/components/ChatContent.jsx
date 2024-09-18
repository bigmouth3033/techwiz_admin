import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Avatar from "react-avatar";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import { showDate } from "@/shared/utils/showFullDateTime";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";
import { adminRequest } from "@/shared/api/adminApi";
import { saveMessageRequest } from "../api/chatApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  gap: 1rem;
  height: 35rem;
  overflow-y: auto;
  padding: 1rem;

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(205, 205, 207);
  }
`;

const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  & > p {
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

    & > span:nth-of-type(1) {
      color: rgba(0, 0, 0, 0.4);
    }

    & > span:nth-of-type(3) {
      font-size: 12px;
    }
  }

  ${(props) => {
    if (props.$from == "Admin") {
      return css`
        align-self: flex-end;

        & > p {
          align-items: flex-end;
        }
      `;
    }
  }}
`;

const InputContainer = styled.form``;

const ChatInput = styled.input`
  width: 100%;
  height: 5rem;
  resize: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  > p {
    display: flex;
    flex-direction: column;
    gap: 3px;
    & > span:nth-of-type(2) {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }

    & > span:nth-of-type(1) {
      font-size: 17px;
    }
  }
`;

export default function ChatContent({
  getCustomerMessages,
  messages,
  setMessages,
  chosenRoom,
  chatRooms,
  setChatRooms,
}) {
  const saveMessage = saveMessageRequest();
  const meesageContainerRef = useRef();
  const admin = adminRequest();
  const [message, setMessage] = useState("");
  const { connectionRef } = useOutletContext();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (getCustomerMessages.isSuccess) {
      let tempMessage = [];
      for (let page of getCustomerMessages.data.pages) {
        tempMessage = [...tempMessage, ...page.data];
      }
      setMessages(tempMessage);
    }
  }, [getCustomerMessages.fetchStatus]);

  const onSendMessage = (ev) => {
    ev.preventDefault();

    meesageContainerRef.current.scrollTo(0, meesageContainerRef.current.scrollHeight);

    setMessages((prev) => [
      {
        messageContent: message,
        createdAt: new Date().toString(),
        from: "Admin",
        customer: {
          email: admin.data.data.email,
        },
      },
      ...prev,
    ]);

    setChatRooms((prev) => [
      {
        messageContent: message,
        customerId: chosenRoom.customer.id,
        customer: {
          id: chosenRoom.customer.id,
          avatar: chosenRoom.customer.avatar,
          email: chosenRoom.customer.email,
        },
      },
      ...prev.filter((item) => item.customer.id != chosenRoom.customer.id),
    ]);

    connectionRef.current.invoke("AdminSendMessageUser", {
      id: chosenRoom.customer.id,
      email: admin.data.data.email,
      roomId: chosenRoom.customer.id,
      message: message,
      avatar: admin.data.data.avatar,
    });

    const formData = new FormData();

    formData.append("id", chosenRoom.customer.id);
    formData.append("message", message);

    saveMessage.mutate(formData, {
      onSuccess: (response) => {
        setMessage("");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    if (inView) {
      if (getCustomerMessages.hasNextPage) {
        getCustomerMessages.fetchNextPage();
      }
    }
  }, [entry]);

  return (
    <Container>
      {chosenRoom && (
        <MessageHeader>
          <Avatar
            src={chosenRoom.customer.avatar && getFirebaseImageUrl(chosenRoom.customer.avatar)}
            name={chosenRoom.customer.email}
            round
            size="50"
          />
          <p>
            <span>{chosenRoom.customer.email}</span>
            {chosenRoom.customer.fullName && <span>{chosenRoom.customer.fullName}</span>}
          </p>
        </MessageHeader>
      )}
      <MessageContainer ref={meesageContainerRef}>
        {messages.map((item, index) => {
          return (
            <MessageItem key={index} $from={item.from}>
              {item.from != "Admin" && (
                <Avatar
                  src={item.customer.avatar && getFirebaseImageUrl(item.customer.avatar)}
                  name={item.customer.email}
                  round
                  size="50"
                />
              )}
              <p>
                <span>{item.from != "Admin" && item.customer.email}</span>
                <span> {item.messageContent}</span>
                <span>{showDate(item.createdAt)}</span>
              </p>
            </MessageItem>
          );
        })}
        <div ref={ref}></div>
      </MessageContainer>
      {chosenRoom && (
        <InputContainer onSubmit={onSendMessage}>
          <ChatInput value={message} onChange={(ev) => setMessage(ev.target.value)} />
        </InputContainer>
      )}
    </Container>
  );
}
