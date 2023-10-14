import styled from "styled-components";

const BoardMain = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Tile = styled.div`
  display: inline-block;
  margin: 1px;
  border: solid 1px #555;
  width: 20px;
  height: 20px;
`;

const TileLine = styled.div`
  line-height: 0;
`;

const Board = () => {
  const createLine = (i: number) => 
    [...Array(10).keys()].map((j) => <Tile key={j + 10 * i} />)
  const lines = [...Array(25).keys()].map((i) => (
    <TileLine key={i}>
      {createLine(i)}
    </TileLine>
  ));
  return (
    <BoardMain>{lines}</BoardMain>
  )
}

export default Board;