import {toast} from "react-toastify";

// @ts-ignore
export const errorMiddleware = store => next => action => {
    if (action.type.endsWith('/rejected')) {
        // Обработка ошибки

        console.error('Ошибка произошла:', action.error as string)

        // Показ уведомления через библиотеку toast:
        toast.error('Произошла ошибка: ' + (action.error as {message: string}).message)
    }

    // Передача действия дальше
    return next(action)
}