import styled from "styled-components";
import { useState } from "react";
import ChatSideBar from "./components/ChatSideBar";
import ChatContent from "./components/ChatContent";
import { getChatRoomRequest } from "./api/chatApi";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getCustomerMessagesRequest } from "./api/chatApi";

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: white;

  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: white;
`;

export default function Chat() {
  const [chatRooms, setChatRooms] = useState([]);
  const getChatRoom = getChatRoomRequest();
  const [messages, setMessages] = useState([]);
  const [chosenRoom, setChosenRoom] = useState(null);
  const getCustomerMessages = getCustomerMessagesRequest(chosenRoom?.customerId, 10);
  const { connectionRef, newMessage, setNewMessage } = useOutletContext();

  useEffect(() => {
    const eventCallBack = (receivedMessage) => {
      setMessages((prev) => [
        {
          id: receivedMessage.id,
          messageContent: receivedMessage.message,
          createdAt: new Date().toString(),
          from: "User",
          customer: {
            email: receivedMessage.email,
            avatar: receivedMessage.avatar,
          },
        },
        ...prev,
      ]);
    };

    const leaveRoom = async (chosenRoom) => {
      if (chosenRoom != null) {
        await connectionRef.current.invoke("leaveChatRoom", {
          id: chosenRoom.customerId,
          email: "Admin",
        });
      }
    };

    const joinRoom = async () => {
      if (chosenRoom != null) {
        await connectionRef.current.invoke("JoinChatRoom", {
          id: chosenRoom.customerId,
          email: "Admin",
        });

        connectionRef.current.on("ReceiveUserRoomMessage", eventCallBack);
      }
    };

    joinRoom();

    return () => {
      if (chosenRoom) {
        connectionRef.current.off("ReceiveUserRoomMessage", eventCallBack);
        leaveRoom(chosenRoom);
      }
    };
  }, [chosenRoom]);

  useEffect(() => {
    if (newMessage) {
      setChatRooms((prev) => [
        {
          messageContent: newMessage.message,
          customerId: newMessage.id,
          customer: {
            id: newMessage.id,
            avatar: newMessage.avatar,
            email: newMessage.email,
          },
        },
        ...prev.filter((item) => item.customer.id != newMessage.id),
      ]);
    }
  }, [newMessage]);

  return (
    <Container>
      <ChatSideBar
        chosenRoom={chosenRoom}
        setChosenRoom={setChosenRoom}
        getChatRoom={getChatRoom}
        chatRooms={chatRooms}
        setChatRooms={setChatRooms}
      />
      <ChatContent
        chosenRoom={chosenRoom}
        getCustomerMessages={getCustomerMessages}
        messages={messages}
        setMessages={setMessages}
        chatRooms={chatRooms}
        setChatRooms={setChatRooms}
      />
    </Container>
  );
}
