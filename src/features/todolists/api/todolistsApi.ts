import type {Todolist} from "./todolistsApi.types"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";

import {BaseResponse} from "@/common/types";
import {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";


export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ['Todolist'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers, _api) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (builder) => ({
    fetchTodolists: builder.query<DomainTodolist[], void> ({
      query: () => '/todo-lists',
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map ((tl) => {
          return {...tl, filter: 'all', entityStatus: 'idle'}
        })
      },
      providesTags: ['Todolist']
    }),

    createTodolists: builder.mutation<BaseResponse<{item: Todolist}>, string> ({
      query: (title) => {
        return {
          method: 'post',
          url: '/todo-lists',
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),

   deleteTodolists: builder.mutation<BaseResponse, string> ({
      query: (id) => {
        return {
          method: 'delete',
          url: `/todo-lists/${id}`,
        }
      },
     invalidatesTags: ['Todolist']
    }),

    changeTodolists: builder.mutation<BaseResponse, {id: string, title: string}> ({
      query: ({id, title}) => {
        return {
          method: 'put',
          url: `/todo-lists/${id}`,
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),

  }),
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

 export const {useFetchTodolistsQuery, useLazyFetchTodolistsQuery, useCreateTodolistsMutation, useDeleteTodolistsMutation, useChangeTodolistsMutation} = todolistsApi