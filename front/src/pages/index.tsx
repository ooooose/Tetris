import React from 'react';
import { Center, Text, Button, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import RankingTable from '@/components/RankingTable';

export default function Home() {
  return (
    <>
      <Center display="flex" flexDirection="column" height="100vh" gap={3}>
        <VStack mb='30px'>
          <Text fontSize="50px" fontWeight="bold">
            Game Park
          </Text>
          <Text mb='20px'>好きなゲームで遊んでスコアを競うアプリです</Text>
          <Button as={NextLink} href={'/signup'}>
            ログイン・サインアップへ
          </Button>
        </VStack>
        <RankingTable />
      </Center>
    </>
  );
}
