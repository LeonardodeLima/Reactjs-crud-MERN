export default (state = '', action ) => {
    switch (action.type){
        case "SET_ERROR":
            return action.payload.menssage;
        case "CLEAR_ERROR":
            return ""
        default:
            return state        
    }
}