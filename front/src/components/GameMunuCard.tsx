import React from 'react';
import Link from 'next/link';
import { TETRIS } from '@/utils/urls';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
} from '@chakra-ui/react';

const GameMenuCard = () => {
  const renderCardContent = () => {
    return (
      <>
        <CardBody>
          <Image
            src="/tetris.png"
            alt="Tetris game alt"
            borderRadius="lg"
            width="90%"
          />
          <Stack mt="6" spacing="3" h="100px">
            <Heading size="md">テトリス</Heading>
            <Text>
              落ちてくるブロックを組み合わせましょう！
              行に隙間なくブロックが敷き詰めることができれば、その行は消えてポイントが付与されます！
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <button className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600">
              <Link href={TETRIS}>今すぐ遊ぶ</Link>
            </button>
          </ButtonGroup>
        </CardFooter>
      </>
    );
  };
  return <Card maxW="sm">{renderCardContent()}</Card>;
};

export default GameMenuCard;
