import type { NextPage } from "next"
import Board from "@/components/Board";

type Position = { row: number; col: number };

const PlayGame: NextPage = () =>  {
  return (
    <>
      <div className="tetris flex justify-center">
        {/* テトリスボードの描画 */}
        <Board />
      </div>
    </>
  );
}

export default PlayGame;