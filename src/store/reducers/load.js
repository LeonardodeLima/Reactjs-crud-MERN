export default (state = false , action ) => {
    switch (action.type){
        case "CHANGE_LOAD":
            return action.payload.load;
        default:
            return state        
    }
}