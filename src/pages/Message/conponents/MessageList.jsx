import styled from "styled-components"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetNoteroomList from "../../../services/useGetNoteroomList";
import calculateTimeAgo from "../../../utils/calculateTimeAgo";

const MessageList = () => {
  const { noteroomList, getNoteroomList } = useGetNoteroomList();
  const navigate = useNavigate();

  useEffect(() => {
    getNoteroomList();
  }, [getNoteroomList])

  const lastTimeAgo = calculateTimeAgo(noteroomList.sendDt);

  return (
    <>
      {
        noteroomList?.map((data) => (
          <MessageListContainer key={data.sendDt} onClick={() => navigate(`./${data.roomId}`, { state: { opponentId: data.opponentId } })}>
            <h2 style={{ margin: "0px 0px 10px 0px" }}>{data.roomName}</h2>
            <p style={{ margin: 0 }}>마지막 쪽지 : {data.message}</p>
          </MessageListContainer >
        ))
      }
    </>
  )
}

const MessageListContainer = styled.div`
  cursor: pointer;
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  transition: background-color 0.5s ease;

  &: hover {
    background-color: #f1f3f5;
  };
`

const DateText = styled.p`
  font-size: 15px;
  color: #afafb2;
  margin: 0;
  postion: absolute;
  right: 0;
  top: 0;
`

export default MessageList;