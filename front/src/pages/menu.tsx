import React from 'react';
import { Center, Text, Box, HStack } from '@chakra-ui/react';
import Header from '@/components/Header';
import GameMenuCard from '@/components/GameMunuCard';
import { TETRIS } from '@/utils/urls';

const Menu = () => {
  return (
    <Box>
      <Header />
      <Center display="flex" flexDirection="column" height="100vh" pt='60px'>
        <Text fontSize="40px" fontWeight="bold">
          好きなゲームで遊びましょう！
        </Text>
        <HStack gap={4}>
          <GameMenuCard name='テトリス' description='' path={TETRIS} />
          <GameMenuCard name='' />
          <GameMenuCard name='' />
        </HStack>
      </Center>
    </Box>
  );
};

export default Menu;
