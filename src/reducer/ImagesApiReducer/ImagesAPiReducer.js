export const ImageAPiInitialState={
    datas:null,
    isLoading:false,
    isSuccess:false,
    rejected:""
}

export const ImageAPiReducer=(state,action)=>{
   switch (action.type) {
    case "LOADING":{
        return state={
            ...state,
            isLoading:true
        }
    }
    case "SUCCESS":{
        return state={
            isLoading:false,
            isSuccess:true,
            datas:action.payload,
            rejected:""
        }
    }
    case "REJECTED":{
        return state={
            isLoading:false,
            isSuccess:false,
            datas:null,
            rejected:action.payload
        }
    }
    
    default:
        return state;
   }
}