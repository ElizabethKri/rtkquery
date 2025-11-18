import {EditableSpan} from "@/common/components"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {useChangeTodolistsMutation, useDeleteTodolistsMutation} from "@/features/todolists/api/todolistsApi.ts";
import {DomainTodolist} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist



  const [deleteTodolists] = useDeleteTodolistsMutation()
  const [changeTodolists] = useChangeTodolistsMutation()

  const deleteTodolistHandler =  () => {

    // dispatch(deleteTodolistTC(id))


      //     .unwrap().catch(() => {
      //     changeTodolistStatus('failed')
      // })



       deleteTodolists(id)

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
