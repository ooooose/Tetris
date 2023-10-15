import { useEffect } from "react";
import styled from "styled-components";
import { findBlock } from "@/features/blocks";
import useBlocks from "@/hooks/useBlocks";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 25;

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
  backgroud-color: green
`;

const TileLine = styled.div`
  line-height: 0;
`;

const Board = () => {
  const { blocks, fallingBlock, nextStep } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );
  const blocksOnBoard = [
    ...blocks,
    ...(fallingBlock === null ? [] : [fallingBlock]),
  ];
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocksOnBoard, x, y);
    return <Tile key={y + BOARD_WIDTH * x} />;
  }

  const createLine = (i: number) =>
    [...Array(BOARD_WIDTH).keys()].map((j) => createTile(j, i));

  const lines = [...Array(BOARD_HEIGHT).keys()].map((i) => (
    <TileLine key={i}>
      {createLine(i)}
    </TileLine>
  ));

  useEffect(() => {
    window.addEventListener('keydown', nextStep);

    return () => {
      window.removeEventListener('keydown', nextStep);
    }
  })


  return (
    <BoardMain>{lines}</BoardMain>
  )
}

export default Board;