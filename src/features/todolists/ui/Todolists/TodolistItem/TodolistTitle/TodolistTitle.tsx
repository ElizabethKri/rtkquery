import {EditableSpan} from "@/common/components"
import {type DomainTodolist,} from "@/features/todolists/model/todolists-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import {useChangeTodolistsMutation, useDeleteTodolistsMutation} from "@/features/todolists/api/todolistsApi.ts";

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  // const dispatch = useAppDispatch()

  const [deleteTodolistsTitle] = useDeleteTodolistsMutation()
  const [changeTodolistsTitle] = useChangeTodolistsMutation()

  const deleteTodolistHandler = () => {
    // dispatch(deleteTodolistTC(id))
    deleteTodolistsTitle(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    // dispatch(changeTodolistTitleTC({ id, title }))
    changeTodolistsTitle({id, title})
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
