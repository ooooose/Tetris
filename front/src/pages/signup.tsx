import { Center, Box, Text } from "@chakra-ui/react";
import AuthForm from "@/components/AuthForm";

export default function SignUp() {
  return (
    <>
      <Center display="flex" flexDirection="column" height="100vh">
        <Box>
          <AuthForm />
        </Box>
      </Center>
    </>
  )
}