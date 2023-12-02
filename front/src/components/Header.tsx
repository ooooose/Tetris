import React from 'react';
import { Box, Text, Link, HStack, Button } from '@chakra-ui/react';
import { useProcessAuth } from '@/hooks/useProcessAuth';

type Props = {
  name: string | undefined;
  score: number | undefined;
};

const Header = ({ name, score }: Props) => {
  const { logout } = useProcessAuth();

  return (
    <Box w="100%" h="60px" backgroundColor="blue.200" position="fixed">
      <Box float="left" ml={5} lineHeight="60px">
        <Text fontSize="30px" fontWeight="bold">
          Game Center
        </Text>
      </Box>
      <Box float="right" lineHeight="60px" mr={5}>
        <HStack gap="20px">
          <Text fontWeight="bold">
            ようこそ{name}さん：スコア{score}点
          </Text>
          <Link
            onClick={() => {
              if (confirm('ログアウトしますか？')) {
                logout();
              }
            }}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text fontWeight="bold" color="gray">
              ログアウト
            </Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
