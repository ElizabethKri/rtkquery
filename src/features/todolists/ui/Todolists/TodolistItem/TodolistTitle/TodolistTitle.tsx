import {EditableSpan} from "@/common/components"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {
    todolistsApi,
    useChangeTodolistsMutation,
    useDeleteTodolistsMutation
} from "@/features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "@/common/hooks";
import {RequestStatus} from "@/common/types";
import {DomainTodolist} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const [deleteTodolists] = useDeleteTodolistsMutation()
  const [changeTodolists] = useChangeTodolistsMutation()

  const deleteTodolistHandler = () => {

    // dispatch(deleteTodolistTC(id))

      const changeTodolistStatus = (entityStatus: RequestStatus) => {
          dispatch(
              todolistsApi.util.updateQueryData('fetchTodolists', undefined, (todolists) => {
                  const todolist = todolists.find((todolist) => todolist.id === id)
                  if(todolist){
                      todolist.entityStatus = entityStatus
                  }
              })
          )
      }

      changeTodolistStatus('loading')

      deleteTodolists(id)
          .unwrap().catch(() => {
          changeTodolistStatus('failed')
      })
  }


  const changeTodolistTitleHandler = (title: string) => {
    // dispatch(changeTodolistTitleTC({ id, title }))
    changeTodolists({id, title})
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
