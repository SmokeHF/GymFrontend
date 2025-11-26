
import { Routes,BrowserRouter,Route,useLocation} from 'react-router-dom';
import { useNavigate } from "react-router";
import './App.css';
import { useState} from 'react';
import LoginPage, { Password, Submit, Username } from '@react-login-page/page1';
import {Button} from 'react-login-page';

const currentBackendIP="https://gymsheet.pl/backend/"
let currentToken='invalid';
function App() {
  
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/csvPreview" element={<CsvPreview />} />
      </Routes>
    </BrowserRouter>
  );
}
function CsvPreview(){
  const {state} = useLocation();
  const {htmlPreview} = state;
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
  )

}
function Home() {
  const [weightVal,setWeight] = useState();
  const [repsVal,setReps] = useState();
  const [reserveVal,setReserve] = useState();
  const [exerciseVal,setExercise] = useState('BenchPress');
  const [refreshedInput,refreshInput] = useState(true);
  const navigate = useNavigate();

  function getCsv(){
    fetch(currentBackendIP+"csvDownload",{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({token:currentToken})
    }).then(response => {
        if(response.status===200){
          response.blob().then(blob =>{
            const fileurl = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = fileurl;
            link.setAttribute('download','gymSheet.csv');
            document.body.appendChild(link);
            link.click();
          })
        }
        else {
          alert("You have an empty sheet")
        }
      })
  }

  function exerciseSend(){
    let trueReserve=reserveVal;
    if (weightVal===undefined || repsVal===undefined){
      alert("fill all inputs");
    }
    else{
      if(trueReserve===undefined){
        trueReserve=0;
      }
     
      fetch(currentBackendIP+"csvpost", {
        method: "POST",
        body: JSON.stringify({
          exercise:exerciseVal,set:0,weight:weightVal,reps:repsVal,reserve:trueReserve,token:currentToken
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.text())
        .then((json) => console.log(json));
        
      refreshInput(!refreshedInput);
      setReps();
      setReserve();
      setWeight();
    }
  }
  function getCsvPreview(){
    
    fetch(currentBackendIP+'showCsv',{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({token:currentToken})
    }).then((response) => {
        if(response.status===200){
          response.blob().then(blob =>{
            blob.text().then((htmlPreview)=>navigate("/csvPreview",{state:{htmlPreview} }))
          })
        }
        else {
          alert("You have an empty sheet")
        }
      })
  }

  return (
    <header className="App-header">
      <style>{` html { background-color: #282c34; } `}</style>
      {refreshedInput && 
      <ExerciseInputBoxes exerciseVal={exerciseVal} setExercise={setExercise}
      weightVal={weightVal} setWeight={setWeight} repsVal={repsVal} 
      setReps={setReps} reserveVal={reserveVal} setReserve={setReserve} />
      }
      {!refreshedInput && 
      <ExerciseInputBoxes exerciseVal={exerciseVal} setExercise={setExercise}
      weightVal={weightVal} setWeight={setWeight} repsVal={repsVal} 
      setReps={setReps} reserveVal={reserveVal} setReserve={setReserve} />
      }
      <button onClick={exerciseSend}>Send</button>
      <button onClick={getCsv}>Download</button>
      <button onClick={getCsvPreview}>Preview CSV</button>
    </header>
  );
}
function LogIn(){
  const [usernameVal,setUsername]=useState();
  const [passwordVal,setPassword]=useState();
  let navigate=useNavigate();
  const css = {'min-width':'450px', 'height':'100%'};

  function loginSend(){
    
    if(usernameVal===undefined||passwordVal===undefined){
      alert("fill all inputs!");
    }
    else{
      fetch(currentBackendIP+"getToken",
      { 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username:usernameVal,password:passwordVal})
      }).then((response) => response.text()).then((responsetxt) => {
        if(responsetxt==="wrong password" || responsetxt==="wrong username"){
          alert(responsetxt);
        }
        else{
          currentToken=responsetxt;
          console.log(responsetxt);
          navigate("/home");
        }
      });

      
    }
    
  }
  function register(){
    if(usernameVal===undefined||passwordVal===undefined){
      alert("fill all inputs!");
    }
    else{
      fetch(currentBackendIP+"registerUser",
      { 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username:usernameVal,password:passwordVal})
      }).then((response) => response.text()).then((responsetxt) => {
        if(responsetxt==="username taken"){
          alert(responsetxt);
        }
        else{
          currentToken=responsetxt;
          console.log("token = "+currentToken);
          navigate("/home");
        }
      });
      
    }
  }
  return (
    
    <LoginPage style={{ ...css }}>
      <style>{` html { background-color:rgb(200,80,130)`}</style>
      <Username value={usernameVal} onChange={e => setUsername(e.target.value)}></Username>
      <Password value={passwordVal} onChange={e => setPassword(e.target.value)}></Password>
      <Submit onClick={loginSend} >Log in</Submit>
      <Button keyname="register" type="submit" onClick={register}>Register</Button>
    </LoginPage>
  );
}

function ExerciseInputBoxes({exerciseVal,setExercise,weightVal,setWeight,repsVal,setReps,reserveVal,setReserve}) {
  
  return (
    
    <div style={{display:'flex'}}>
      <div >
        <div>
          <label>Excercise</label>
        </div>
        <div>
          <select class="boxes" value={exerciseVal} onChange={e => setExercise(e.target.value)}>
            <option value="BenchPress">BenchPress</option>
            <option value="ShoulderPress">ShoulderPress</option>
            <option value="LatteralRaises">Latteral Raises</option>
            <option value="LatPulldown">Lat Pulldown</option>
            <option value="InclineBench">InclineBench</option>
            <option value="Dips">Dips</option>
            <option value="AbsCableCrunches">AbsCableCrunches</option>
            <option value="MachineChestFlys">MachineChestFlys</option>
            <option value="TricepsPushdowns">TricepsPushdowns</option>
            <option value="Pullups">Pullups</option>
            <option value="DumbellCurls">Dumbell Curls</option>
            <option value="BarbellCurls">BarbellCurls</option>
            <option value="CabelRows">Cabel Rows</option>
            <option value="HammerCurls">HammerCurls</option>
            <option value="RearDeltFlys">RearDeltFlys</option>
          </select>
        </div>
      </div>
      <div >
        <div>
          <label>weight</label>
        </div>
        <div>
          <input type="number" class="inputbox" value={weightVal} onInput={e => setWeight(e.target.value)}></input>
        </div>
      </div>
      <div>
        <div>
          <label>reps</label>
        </div>
        <div>
          <input class="inputbox" type="number" value={repsVal} onInput={e => setReps(e.target.value)}></input>
        </div>
      </div>
      <div>
        <div>
          <label>reserve</label>
        </div>
        <div>
          <input class="inputbox" type="number" value={reserveVal} onInput={e => setReserve(e.target.value)}></input>
        </div>
      </div>
      
    </div>
    
  );
}
export default App

