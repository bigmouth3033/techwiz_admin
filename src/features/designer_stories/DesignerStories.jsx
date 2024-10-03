import { useState } from "react";
import styled, { css } from "styled-components";
import Avatar from "react-avatar";
import { adminRequest } from "@/shared/api/adminApi";
import getFirebaseImageUrl from "@/shared/utils/getFireBaseImage";
import NewStoryPopUp from "./components/NewStoryPopUp";
import { getDesignerStoryRequest } from "./api/designerStoryApi";
import Pagination from "@/shared/components/Pagination/pagination";
import { formatDate } from "@/shared/utils/DateTimeHandle";
import getWords from "@/shared/utils/getWords";
import UpdateStoryPopUp from "./components/UpdateStoryPopUp";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { DefinedRange } from "react-date-range";

const Container = styled.div`
  margin: 2rem;
  padding: 0 1rem;

  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const LeftContainer = styled.div`
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
`;

const NewButton = styled.div`
  background-color: #f0f2f5;
  padding: 1rem;
  border-radius: 50px;

  color: rgba(0, 0, 0, 0.5);
  flex: 1;
  cursor: pointer;

  &:hover {
    background-color: #e4e6e8;
  }
`;

const RightContainer = styled.div`
  > div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: white;
    position: sticky;
    top: 5rem;
  }
`;

const NewStoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  padding: 1rem;
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 0;
`;

const StoryItem = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & button {
    background-color: white;
    border: none;
    color: blue;
  }

  > div:nth-of-type(1) {
    font-size: 17px;
    font-weight: 600;
    padding: 1rem;
  }

  > div:nth-of-type(2) {
    padding: 0 1rem;
  }
`;

const Footer = styled.div``;

const ImageContainer = styled.div`
  display: grid;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(props) => {
    if (props.$length == 1) {
      return css`
        > div {
          height: 40rem;
        }
      `;
    }

    if (props.$length == 2) {
      return css`
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        > div {
          height: 20rem;
        }
      `;
    }

    if (props.$length == 3) {
      return css`
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        > div {
          height: 20rem;
        }
      `;
    }

    if (props.$length > 3) {
      return css`
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        > div {
          height: 15rem;
        }
      `;
    }
  }}
`;

export default function DesignerStories() {
  const [chosenUpdate, setChosenUpdate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const admin = adminRequest();
  const [newStory, setNewStory] = useState(false);

  const current = new Date();

  const [date, setDate] = useState([
    {
      startDate: new Date(current.getFullYear(), current.getMonth(), 1),
      endDate: new Date(current.getFullYear(), current.getMonth() + 1, 0),
      key: "selection",
    },
  ]);

  const getDesignerStory = getDesignerStoryRequest(
    admin.data.data.interiordesigner.id,
    currentPage,
    10,
    date[0]
  );

  return (
    <>
      <Container>
        <LeftContainer>
          <NewStoryContainer>
            <Avatar
              size="50"
              round
              src={getFirebaseImageUrl(admin.data.data.interiordesigner.avatar)}
            />
            <NewButton onClick={() => setNewStory(true)}>What is your new story?</NewButton>
          </NewStoryContainer>
          <StoryContainer>
            {getDesignerStory.isSuccess &&
              getDesignerStory.data.data.map((story, index) => {
                const images = story.image.split("; ").filter((image) => image.length != 0);
                return (
                  <StoryItem key={index}>
                    <div>{formatDate(story.created_at)}</div>
                    <div>
                      {getWords(story.content, 30)}{" "}
                      <button onClick={() => setChosenUpdate(story)}>See more</button>
                    </div>
                    <ImageContainer $length={images.length}>
                      {images.map((image, index) => {
                        if (index < 4)
                          return (
                            <div key={index}>
                              <img src={getFirebaseImageUrl(image)} />
                            </div>
                          );
                      })}
                    </ImageContainer>
                  </StoryItem>
                );
              })}
          </StoryContainer>

          <Footer>
            {getDesignerStory.isSuccess && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={getDesignerStory.data.totalPages}
              />
            )}
          </Footer>
        </LeftContainer>
        <RightContainer>
          <div>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
            <DefinedRange onChange={(item) => setDate([item.selection])} ranges={date} />
          </div>
        </RightContainer>
      </Container>

      {newStory && (
        <NewStoryPopUp
          action={() => {
            getDesignerStory.refetch();
            setNewStory();
          }}
        />
      )}
      {chosenUpdate && (
        <UpdateStoryPopUp
          action={() => {
            getDesignerStory.refetch();
            setChosenUpdate();
          }}
          story={chosenUpdate}
        />
      )}
    </>
  );
}
