import { setItem } from "../../utils/utils"
import types from "../types"


const initialState = true

export default Intro =(state = initialState , action)=>{
    switch(action.type){
        case types.INTRO:{
            setItem('intro',state)
            return state = false}
            default: return state
    }
    

}

