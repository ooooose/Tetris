import { useGetUsers } from "@/stores/useUsers/getUsers"


export default function Home() {
  const { data: users } = useGetUsers();
  if (!users) return <div>Loading...</div>;
  return (
    <>
      <h1>Hello Tetris!</h1>
      
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.name}</p>
              <br />
            </div>
          )
        })}

      </div>
    </>
  )
}
