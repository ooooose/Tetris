import React from "react";
import Link from "next/link";
import {Card, 
        CardBody, 
        CardFooter, 
        Image, 
        Stack, 
        Heading,
        Text, 
        ButtonGroup,
        Button,
       } from '@chakra-ui/react'

type Props = {
  name: string | '';
  description?: string;
  path?: string;
}

const GameMenuCard = ({ name, description, path }: Props) => {
  const renderCardContent = () => {
    if (name === "") {
      return (
        <>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>テトリス</Heading>
              <Text>
                落ちてくるブロックを組み合わせましょう！
                行に隙間なくブロックが敷き詰めることができれば、その行は消えてポイントが付与されます！
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                今すぐ遊ぶ
              </Button>
            </ButtonGroup>
          </CardFooter>
        </>
      );
    } else {
      return (
        <>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>テトリス</Heading>
              <Text>
                落ちてくるブロックを組み合わせましょう！
                行に隙間なくブロックが敷き詰めることができれば、その行は消えてポイントが付与されます！
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                <Link href={path}>
                  今すぐ遊ぶ
                </Link>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </>
      );
    }
  };

  return (
    <Card maxW='sm'>
      {renderCardContent()}
    </Card>
  )
}

export default GameMenuCard;