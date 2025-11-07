import type {Todolist} from "./todolistsApi.types"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";


export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers, _api) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (builder) => {
    return {
      getTodolists: builder.query<Todolist[], void>({
        query: () => {
          return {
            method: "get",
            url: '/todo-lists"',
          }
        },
      }),
    }
  },
})

// export const todolistsApi = {
//   getTodolists() {
//     return instance.get<Todolist[]>("/todo-lists")
//   },
//   changeTodolistTitle(payload: { id: string; title: string }) {
//     const { id, title } = payload
//     return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
//   },
//   createTodolist(title: string) {
//     return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
//   },
//   deleteTodolist(id: string) {
//     return instance.delete<BaseResponse>(`/todo-lists/${id}`)
//   },
// }
