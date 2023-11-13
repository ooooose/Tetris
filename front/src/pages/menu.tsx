import { Center, Text } from "@chakra-ui/react";

const Menu = () => {
  return (
    <Center display="flex" flexDirection="column" height="100vh">
      <Text fontSize="90px" fontWeight="bold">Hello!</Text>
      {/* <VStack >
        
        <Button as={NextLink} href={'/signup'}>サインアップへ</Button>
      </VStack> */}
    </Center>
  )
}

export default Menu;