import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";
import {handleError} from "@/common/utils/handleError.ts";

export const baseApi = createApi({
    baseQuery: async(args, api, extraOptions) => {

        //await new Promise(res => setTimeout(res, 2000))

        const res =  await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                "API-KEY": import.meta.env.VITE_API_KEY,
            },
            prepareHeaders: (headers, _api) => {
                headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)

        // if(res.error){
        //     if(
        //         res.error.status === 'FETCH_ERROR' ||
        //         res.error.status === 'PARSING_ERROR' ||
        //         res.error.status === 'CUSTOM_ERROR' ||
        //         res.error.status === 'TIMEOUT_ERROR'
        //     ){
        //         api.dispatch(setAppErrorAC({error: res.error.error}))
        //     }
        //
        // }
        //
        // if(res.error.status === 400){
        //    if(isErrorWithMessage(res.error.data)){
        //        api.dispatch(setAppErrorAC({ error: res.error.data.message }))
        //    }
        // } else {
        //    api.dispatch(setAppErrorAC({ error: JSON.stringify(res.error)}))
        // }
        //
        // if(res.error.status === 403){
        //     api.dispatch(setAppErrorAC({ error: '403 Forbidden Error. Check API-KEY'}))
        // }
        //
        // let error = 'Some error occurred'

        // if (res.error) {
        //     switch (res.error.status) {
        //         case 'FETCH_ERROR':
        //         case 'PARSING_ERROR':
        //         case 'CUSTOM_ERROR':
        //         case 'TIMEOUT_ERROR':
        //             error = res.error.error
        //             break
        //         case 403:
        //             error = '403 Forbidden Error. Check API-KEY'
        //             break
        //         case 400:
        //             if (isErrorWithMessage(res.error.data)) {
        //                 error = res.error.data.message
        //             } else {
        //                 error = JSON.stringify(res.error.data)
        //             }
        //             break
        //         default:
        //             if (res.error.status >= 500 && res.error.status < 600) {
        //                 error = "Server error occurred. Please try again later."
        //             } else {
        //                 error = JSON.stringify(res.error)
        //             }
        //             break
        //     }
        //     api.dispatch(setAppErrorAC({ error }))
        // }
        //
        // // 2. Result code errors
        // if ((res.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
        //     const messages = (res.data as { messages: string[] }).messages
        //     error = messages.length ? messages[0] : error
        //     api.dispatch(setAppErrorAC({ error }))
        // }

        handleError(api, res)

        return res


    },
    reducerPath: "baseApi",
    keepUnusedDataFor: 10,
    tagTypes: ['Todolist', 'Task'],
    endpoints:() => ({})
})