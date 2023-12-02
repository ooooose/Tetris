import React from 'react';
import { useProcessAuth } from '@/hooks/useProcessAuth';
import { Link as ChakraLink, Text } from '@chakra-ui/react';
import Link from 'next/link';

const AuthForm = () => {
  const {
    pw,
    setPw,
    email,
    setEmail,
    name,
    setName,
    isLogin,
    setIsLogin,
    registerMutation,
    loginMutation,
    processAuth,
  } = useProcessAuth();

  if (registerMutation.isLoading || loginMutation.isLoading) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h1 className="text-xl text-gray-600 font-mono">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600">
      <Text display='flex' >
        <Link href='/'>
          <span className="text-center text-3xl font-extrabold">Game Center</span>
        </Link>
      </Text>
      <h2 className="my-6">{isLogin ? 'ログイン画面' : '新規登録画面'}</h2>
      <form onSubmit={processAuth}>
        {!isLogin && (
          <div>
            <input
              className="mb-3 px-3 text-sm py-2 border border-gray-300"
              name="name"
              type="text"
              autoFocus
              placeholder="お名前"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="email"
            type="email"
            autoFocus
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            name="password"
            type="password"
            autoFocus
            placeholder="パスワード"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className="flex justify-center my-2">
          <button
            className="disabled:opacity-40 py-2 px-4 rounded text-white bg-indigo-600"
            disabled={!email || !pw}
            type="submit"
          >
            {isLogin ? 'ログイン' : '新規登録'}
          </button>
        </div>
      </form>
      <ChakraLink onClick={() => setIsLogin(!isLogin)} w="100%" textAlign="center">
        {isLogin ? '新規登録画面へ' : 'ログイン画面へ'}
      </ChakraLink>
    </div>
  );
};

export default AuthForm;
