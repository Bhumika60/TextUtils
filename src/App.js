import { useState } from 'react';
import './App.css';
// import About from './Components/About.js';
import Navbar from './Components/Navbar.js'
import TextForm from './Components/TextForm.js'
import Alert from './Components/Alert.js';
function App() {
const [mode, setMode] = useState('light');
const [alert, setAlert] = useState(null);

const showAlert = (message, type) => {
  setAlert({
    msg: message ,
    type: type
  });
  setTimeout(() => {
    setAlert(null)
  },1000)
}

const toggleMode = () => {
  if(mode === 'light'){
    setMode('dark')
    document.body.style.backgroundColor = '#001e3ff5';
    showAlert("Dark mode has been enabled", "success")
  }
  else{
    setMode('light')
    document.body.style.backgroundColor = '#e1e1e1f5';
    showAlert("Light mode has been enabled", "success")
  }
}

  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Us"/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode = {toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      <TextForm heading="Enter the Text to analyze" mode={mode}/>
      {/* <About/> */}
      </div>
    </>
  );
}

export default App;


