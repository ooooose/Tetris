import { useCallback, useMemo } from 'react';
import styled from "styled-components";
import { getTiles } from "@/features/blocks";
import { COLOR_NAME } from "@/features/blocks/blocks-constants";
import useBlocks from "@/hooks/useBlocks";
import useTimer from '@/hooks/useTimer';
import useKeyHandler from '@/hooks/useKeyHandler';

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

function Board() {
  const { tiles, fallingBlock, isGameOvered, nextStep, move, fall } = useBlocks(
    BOARD_WIDTH,
    BOARD_HEIGHT
  );

  useTimer(nextStep);

  useKeyHandler(nextStep, move, fall);

  const tilesOnBoard = useMemo(
    () => [...tiles, ...(fallingBlock === null ? [] : getTiles(fallingBlock))],
    [fallingBlock, tiles]
  );

  const createTile = useCallback(
    (x: number, y: number) => {
      const blockType = tilesOnBoard.find(
        (tile) => tile.x === x && tile.y === y
      )?.type;
      const classNames = blockType ? COLOR_NAME[blockType] : '';

      return <Tile key={y + BOARD_WIDTH * x} className={classNames} />;
    },
    [tilesOnBoard]
  );

  const createLine = useCallback(
    (i: number) => [...Array(BOARD_WIDTH).keys()].map((j) => createTile(j, i)),
    [createTile]
  );

  const lines = useMemo(
    () =>
      [...Array(BOARD_HEIGHT).keys()].map((i) => (
        <div key={i}>
          {createLine(i)}
        </div>
      )),
    [createLine]
  );

  return (
    <div>
      {/* {isGameOvered ? <GameOver /> : null} */}
      <BoardMain>{lines}</BoardMain>
    </div>
  );
}

export default Board;
