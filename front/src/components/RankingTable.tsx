import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useGetUsers } from '@/stores/useUsers/getUsers';

const RankingTable = () => {
  const { data: users } = useGetUsers();
  if (!users) return <div>Loading...</div>;
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>ユーザーランキング</TableCaption>
        <Thead>
          <Tr>
            <Th>順位</Th>
            <Th>ユーザー</Th>
            <Th isNumeric>スコア</Th>
          </Tr>
        </Thead>
        <Tbody>
        { users.map((user) => {
          return (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
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