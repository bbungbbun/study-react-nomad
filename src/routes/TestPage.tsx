import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  flex-direction: column;
  gap: 10px;
  border: 1px solid white;
  color: white;
  display: flex;
  text-align: center;
  line-height: 100px;
`;

export default function Profile() {
  const boxInfo = [
    {
      id: 1,
      title: "box",
    },
    {
      id: 2,
      title: "box",
    },
    {
      id: 3,
      title: "box",
    },
  ]
  return (
    <Wrapper>
      {boxInfo.map((box) => (
        <Box key={box.id}>{box.title}{box.id}</Box>
      ))}
    </Wrapper>
  );
}