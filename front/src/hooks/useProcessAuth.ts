import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useMutateAuth } from "./useMutateAuth";

export const useProcessAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

  const processAuth  = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      })
    } else {
      await registerMutation
        .mutateAsync({
          name: name,
          email: email,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
        .catch(() => {
          setPw('')
          setEmail('')
        })
    }
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries('user')
    router.push('/')
  }

  return { 
    email,
    setEmail,
    pw,
    setPw,
    name,
    setName,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
   }
}