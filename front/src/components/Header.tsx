import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import { useProcessAuth } from '@/hooks/useProcessAuth';

const Header = () => {
  const { logout } = useProcessAuth();

  return (
    <Box w="100%" h="60px" backgroundColor="blue.200" position="fixed">
      <Box float="left" ml={5} lineHeight="60px">
        <Text fontSize="30px" fontWeight="bold">
          Game Park
        </Text>
      </Box>
      <Box float="right" lineHeight="60px" mr={5}>
        <Link
          onClick={logout}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text fontWeight='bold'>ログアウト</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
