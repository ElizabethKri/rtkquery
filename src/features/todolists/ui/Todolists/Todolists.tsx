import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistItem} from "./TodolistItem/TodolistItem"
import {useFetchTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";

export const Todolists = () => {
  // const todolists = useAppSelector(selectTodolists)
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  const {data, refetch} = useFetchTodolistsQuery()

  //console.log(data)
  // const [trigger, {data}] = useLazyFetchTodolistsQuery()
  // const fetchTodosHandler = () => trigger()

  return (
    <>
      {/*<button onClick={refetch}>actual</button>*/}
      {/*<button onClick={fetchTodosHandler}>get todos</button>*/}
      {data?.map((todolist: any) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
