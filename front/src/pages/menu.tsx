import { Center, Text, Box } from '@chakra-ui/react';
import Header from '@/components/Header';

const Menu = () => {
  return (
    <Box>
      <Header />
      <Center display="flex" flexDirection="column" height="100vh">
        <Text fontSize="90px" fontWeight="bold">
          Hello!
        </Text>
        {/* <VStack >
          
          <Button as={NextLink} href={'/signup'}>サインアップへ</Button>
        </VStack> */}
      </Center>
    </Box>
  );
};

export default Menu;
