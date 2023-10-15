import { useEffect } from "react";
import styled from "styled-components";
import { findBlock, COLOR_NAME } from "@/features/blocks";
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

  &.block-type-i {
    background-color: deepskyblue;
  }
  &.block-type-o {
    background-color: yellow;
  }
  &.block-type-s {
    background-color: mediumseagreen;
  }
  &.block-type-z {
    background-color: red;
  }
  &.block-type-j {
    background-color: royalblue;
  }
  &.block-type-l {
    background-color: goldenrod;
  }
  &.block-type-t {
    background-color: blueviolet;
  }
`;

const TileLine = styled.div`
  line-height: 0;
`;

const Board = () => {
  const { blocks, fallingBlock, nextStep } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );
  //TODO: 下の使用方法を考える。
  const blocksOnBoard = [
    ...blocks,
    ...(fallingBlock === null ? [] : [fallingBlock]),
  ];

  //TODO: findBlockの使い道を考える。
  const createTile = (x: number, y: number) => {
    const block = findBlock(blocksOnBoard, x, y);
    const classNames = block ? COLOR_NAME[block.type] : '';

    return <Tile key={y + BOARD_WIDTH * x} className={classNames} />;
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