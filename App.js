import React, { useEffect } from 'react'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import Routes from './src/navigation/Routes'
import actions from './src/redux/actions'
import store from './src/redux/store'
import { getItem } from './src/utils/utils'



export default function App() {


  useEffect(() => {
    getItem('intro').then((res)=>{
      console.log(res,"getItem>>>res");
      if (res != null) {
        actions.intro(res);
      }
    })

    

    getItem('login').then((res)=>{
      if(!!res){
        console.log("res",res)
        actions.saveUserData(res)
      }
    })
  
   
  }, [])
  
  return (<>
  <FlashMessage position='top'/>
    <Provider store={store}>

      <Routes/>
    </Provider>
  </>
    
  )
}
