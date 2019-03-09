export const actionSetError = message =>({
    type: "SET_ERROR",
    payload:{
        message
    }
})

export const actionClearError = () =>({
    type: "CLEAR_ERROR"
})
