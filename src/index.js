import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
import './styles/index.scss'

const Index = () => (<><App /></>)
  
ReactDom.render(<Index />, document.getElementById("app"))
  

if (module.hot) {
    module.hot.accept()
}