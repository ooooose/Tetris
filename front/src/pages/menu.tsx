import React from 'react';
import { Center, Text, Box, HStack } from '@chakra-ui/react';
import Header from '@/components/Header';
import GameMenuCard from '@/components/GameMunuCard';
import { TETRIS } from '@/utils/urls';

const Menu = () => {
  return (
    <Box>
      <Header />
      <Center display="flex" flexDirection="column" height="100vh">
        <Text fontSize="90px" fontWeight="bold">
          Hello!
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
