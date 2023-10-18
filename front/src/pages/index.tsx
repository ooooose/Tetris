import { Center, Box, Text } from "@chakra-ui/react";
import RankingTable from "@/components/RankingTable";

export default function Home() {
  return (
    <>
      <Center display="flex" flexDirection="column" height="100vh">
        <Text fontSize="md" fontWeight="bold">Hello Tetris!</Text>
        
        <Box>
          <RankingTable />
        </Box>
      </Center>
    </>
  )
}
