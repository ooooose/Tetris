import React from 'react';
import { Center, Text, Box, HStack } from '@chakra-ui/react';
import Header from '@/components/Header';
import { useQueryUser } from '@/hooks/useQueryUser';
import GameMenuCard from '@/components/GameMunuCard';
import { TETRIS } from '@/utils/urls';

const Menu = () => {
  const { data: dataUser } = useQueryUser()
  return (
    <Box>
      <Header name={dataUser?.name} score={dataUser?.score} />
      <Center display="flex" flexDirection="column" height="100vh" pt='60px'>
        <Text fontSize="40px" fontWeight="bold">
          好きなゲームで遊びましょう！
        </Text>
        <HStack gap={4}>
          <GameMenuCard name='テトリス' description='落ちてくるブロックを組み合わせましょう！　
                行に隙間なくブロックが敷き詰めることができれば、その行は消えてポイントが付与されます！' path={TETRIS} />
          <GameMenuCard name='' />
          <GameMenuCard name='' />
        </HStack>
      </Center>
    </Box>
  );
};

export default Menu;
