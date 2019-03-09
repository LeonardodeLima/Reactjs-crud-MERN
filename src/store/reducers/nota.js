export default (state = [] , action ) => {
    switch (action.type){
        case "CHANGE_NOTA":
            return action.payload.nota;
        default:
            return state        
    }
}