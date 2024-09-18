import styled from "styled-components";
import Avatar from "react-avatar";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";
import { useRef } from "react";
import { FaBars } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import sidebar_content from "../sidebar/data/sidebar_content";
import { useLocation } from "react-router-dom";
import TextInput from "@/shared/components/Input/TextInput";
import { Link } from "react-router-dom";
import { adminRequest } from "@/shared/api/adminApi";
import Cookies from "js-cookie";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  display: flex;
  justify-content: space-between;
  height: 4.8rem;
  align-items: center;
  padding: 0 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
`;

const Right = styled.div``;

const ProfileGroup = styled.div`
  position: relative;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  & p {
    font-size: 12px;
    text-align: end;
  }
`;

const HideShowButton = styled.div`
  cursor: pointer;

  & svg {
    font-size: 20px;
  }
`;

const DropDown = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-top: 1rem;
  width: 7rem;
  transform: translateX(-10px);
`;

const DropDownButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  background-color: white;
  border: none;
  font-size: 14px;
  padding: 0.5rem;
  cursor: pointer;
  color: #4066d5;

  &:hover {
    color: black;
    background-color: #f4f5f7;
  }
`;

const CustomTextInput = styled(TextInput)`
  width: auto;
  padding: 6px;

  &:focus + div {
    display: block;
  }
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchOptions = styled.div`
  display: none;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100%;

  &:hover {
    display: block;
  }
  background-color: white;
`;
const SearchOption = styled(Link)`
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  color: black;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f7f6f6;
  }

  display: flex;
  flex-direction: column;

  > p {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;

    > svg {
      font-size: 20px;
    }
  }
`;

export default function Header({ isSideBarSmall, setIsSideBarSmall }) {
  const location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef();
  const dropDownButton = useRef();
  const [currentPage, setCurrentPage] = useState();
  const [search, setSearch] = useState("");
  const admin = adminRequest();

  const edited_sidebar = [];
  for (let item of sidebar_content) {
    if (item.children == null) {
      edited_sidebar.push(item);
    }

    if (item.children != null) {
      for (let children of item.children) {
        edited_sidebar.push(children);
      }
    }
  }

  useEffect(() => {
    const event = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !dropDownButton.current.contains(ev.target)
      ) {
        setDropDown((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", event);

    return () => {
      document.removeEventListener("mousedown", event);
    };
  }, []);

  useEffect(() => {
    for (let item of sidebar_content) {
      if (item.link == location.pathname) {
        setCurrentPage(item.name);
      }

      if (item.children != null) {
        for (let child of item.children) {
          if (child.link == location.pathname) {
            setCurrentPage(child.name);
          }
        }
      }
    }
  }, [location.pathname]);

  const onLogout = () => {
    Cookies.remove("ADMIN_ACCESS_TOKEN");
    admin.refetch();
  };

  return (
    <Container>
      <Left>
        <HideShowButton onClick={() => setIsSideBarSmall((prev) => !prev)}>
          {!isSideBarSmall ? <FaBars /> : <FaArrowRight />}
        </HideShowButton>
        <p>{currentPage}</p>
        <SearchBox>
          <CustomTextInput state={search} setState={setSearch} placeholder={"Search"} />
          <SearchOptions>
            {edited_sidebar
              .filter((item) => {
                return (
                  item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && search != ""
                );
              })
              .map((item) => (
                <SearchOption to={item.link}>
                  <p>
                    {item.icon} {item.name}
                  </p>
                  <p>{item.link}</p>
                </SearchOption>
              ))}
          </SearchOptions>
        </SearchBox>
      </Left>
      <Right>
        <ProfileGroup ref={dropDownButton}>
          <Profile onClick={() => setDropDown((prev) => !prev)}>
            <div>
              <p>{admin.data.data.role}</p>
              <h5>{admin.data.data.fullName}</h5>
            </div>
            <Avatar name={admin.data.data.fullName} size="40" round />
          </Profile>
          {dropDown && (
            <DropDown ref={dropDownRef}>
              <DropDownButton>
                <CiUser />
                Profile
              </DropDownButton>
              <DropDownButton onClick={onLogout}>
                <CiLogout />
                Log out
              </DropDownButton>
            </DropDown>
          )}
        </ProfileGroup>
      </Right>
    </Container>
  );
}
