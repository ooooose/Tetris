import React from 'react';
import { Center, Text, Button, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <>
      <Center display="flex" flexDirection="column" height="100vh">
        <Text fontSize="90px" fontWeight="bold">
          Hello Tetris!
        </Text>
        <VStack>
          <Button as={NextLink} href={'/signup'}>
            サインアップへ
          </Button>
        </VStack>
      </Center>
    </>
  );
}
