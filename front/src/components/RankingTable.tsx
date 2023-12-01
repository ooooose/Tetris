import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from '@chakra-ui/react'
import { useQueryRankingUsers } from '@/hooks/useQueryUser';

const RankingTable = () => {
  const { data: rankingUsers } = useQueryRankingUsers();
  if (!rankingUsers) return <div>Loading...</div>;
  return (
    <TableContainer textAlign='center'>
      <Text fontWeight='bold'>ユーザーランキング</Text>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>順位</Th>
            <Th>ユーザー</Th>
            <Th isNumeric>スコア</Th>
          </Tr>
        </Thead>
        <Tbody>
        { rankingUsers?.map((user, i) => {
          return (
            <Tr key={user.id}>
              <Td>{i + 1}位</Td>
              <Td>{user.name}さん</Td>
              <Td isNumeric>{user.score}</Td>
            </Tr>
          )
        }) }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default RankingTable;
