import type { NextPage } from "next"
import{ useState, useEffect, useCallback } from 'react';
import { ROWS, COLUMNS } from "@/utils/constants";
import { BLOCKS } from "@/components/Blocks";
import { Tetromino } from "@/types/Tetrimino";

type Position = { row: number; col: number };

const PlayGame: NextPage = () =>  {
  const initialBoard: number[][] = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({ row: 0, col: 0 });

  const generateRandomTetromino = () => {
    const randomIndex = Math.floor(Math.random() * BLOCKS.length);
    return BLOCKS[randomIndex];
  };

  const moveTetromino = (dx: number, dy: number) => {
    if (!currentTetromino) {
      return; // currentTetrominoがnullの場合、何もしない
    }

    // 移動先がボードの範囲内か確認
    const newRow = currentPosition.row + dy;
    const newCol = currentPosition.col + dx;

    if (
      newRow >= 0 &&
      newRow + currentTetromino.length <= ROWS &&
      newCol >= 0 &&
      newCol + currentTetromino[0].length <= COLUMNS
    ) {
      setCurrentPosition({ row: newRow, col: newCol });
    }
  };

  const gameLoop = useCallback((): void => {
    moveTetromino(0, 1);

    // ボードの更新や得点の計算などを追加

    requestAnimationFrame(gameLoop);
  }, [currentPosition, currentTetromino]);

  useEffect(() => {
    setCurrentTetromino(generateRandomTetromino());
    setCurrentPosition({ row: 0, col: Math.floor(COLUMNS / 2) });
  }, []);

  useEffect(() => {
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameLoop]);

  return (
    <div className="tetris">
      {/* テトリスボードの描画 */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${cell ? 'occupied' : ''}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PlayGame;