import React,{useEffect} from 'react'
import {Text,View} from 'react-native'
import { Provider } from 'react-redux'
import Routes from './src/navigation/Routes'
import actions from './src/redux/actions'
import store from './src/redux/store'
import { getItem } from './src/utils/utils'



export default function App() {

  useEffect(() => {
    getItem('intro').then((res)=>{
      if(!!res){
        actions.Intro(res)
      }
    })
    getItem('login').then((res)=>{
      if(!!res){
        console.log("res",res)
        actions.saveUserData(res)
      }
    })
  
   
  }, [])
  
  return (
    <Provider store={store}>

      <Routes/>
    </Provider>
    
  )
}
