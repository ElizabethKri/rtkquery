import {TaskStatus} from "@/common/enums"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi"
import List from "@mui/material/List"
import {TaskItem} from "./TaskItem/TaskItem"
import {TasksSkeleton} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx";
import {RequestStatus} from "@/common/types";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {useState} from "react";
import {
  TasksPagination
} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx";

type Props = {
  todolist: DomainTodolist
}

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"

// type GetTaskError = {
//   data: {
//     message: string
//   }
// }

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  //const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  const { data, isLoading} = useGetTasksQuery({id, params: {page}})

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  // if(errData){
  //   if('status' in errData){
  //     const errMsg = 'error' in errData ? errData.error : JSON.stringify(errData.data)
  //     dispatch(setAppErrorAC({ error: errMsg}))
  //   } else {
  //     dispatch(setAppErrorAC({ error: errData.message || 'Something went wrong'}))
  //   }
  //}

  if(isLoading){
    return <TasksSkeleton/>
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
          <div>
            <List>
              {filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}
            </List>
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage}/>
          </div>
      )}
    </>
  )
}
