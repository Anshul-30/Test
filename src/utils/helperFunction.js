import { Icon } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

const showError =(message)=>{
    showMessage({
        type:'danger',
        Icon:'danger',
        message
    })

}

const showSuccess =()=>{
    showMessage({
        type:'success',
        Icon:'success',
        message
    })

}

export{
showError,
showSuccess
}