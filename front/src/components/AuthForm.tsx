import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react'

const AuthForm = () => {
  return (
    <Stack spacing={8} mx={'auto'} maxW={'350px'} py={6}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>メールアドレス</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            color={'white'}
            >
            サインアップ
          </Button>
        </Stack>
    </Stack>
  )
}

export default AuthForm;