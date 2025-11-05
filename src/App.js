
import { Routes,BrowserRouter,Route,Link,useNavigate} from 'react-router-dom';
import './App.css';
import { useState} from 'react';
import LoginPage, { Password, Submit, Username } from '@react-login-page/page1';

const currentBackendIP="http://50.17.102.159/backend/"

function App() {
  
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />  
      </Routes>
    </BrowserRouter>
  );
}
function Home() {
  const [weightVal,setWeight] = useState();
  const [repsVal,setReps] = useState();
  const [reserveVal,setReserve] = useState();
  const [exerciseVal,setExercise] = useState('BenchPress');
  const [refreshedInput,refreshInput] = useState(true);
  const [idVal,setId] = useState('Tomek');

  function getCsv(){
    fetch(currentBackendIP+"csvDownload",
      { 
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({id:idVal})
      }).then(response => response.blob()).then(blob => 
        {
        const fileurl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = fileurl;
        link.setAttribute('download','gymSheet.csv');
        document.body.appendChild(link);
        link.click();
      })
  }

  function exerciseSend(){
    if (weightVal===undefined || repsVal===undefined|| reserveVal===undefined ){
      alert("fill all inputs");
    }
    else{
      fetch(currentBackendIP+"csvpost", {
        method: "POST",
        body: JSON.stringify({
          exercise:exerciseVal,set:0,weight:weightVal,reps:repsVal,reserve:reserveVal,id:idVal
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
  return (
    <div className="App">
        <header className="App-header">
          {refreshedInput && 
          <ExerciseInputBoxes exerciseVal={exerciseVal} setExercise={setExercise}
          weightVal={weightVal} setWeight={setWeight} repsVal={repsVal} 
          setReps={setReps} reserveVal={reserveVal} setReserve={setReserve} idVal={idVal} setId={setId}/>
          }
          {!refreshedInput && 
          <ExerciseInputBoxes exerciseVal={exerciseVal} setExercise={setExercise}
          weightVal={weightVal} setWeight={setWeight} repsVal={repsVal} 
          setReps={setReps} reserveVal={reserveVal} setReserve={setReserve} idVal={idVal} setId={setId}/>
          }
          <button onClick={exerciseSend}>Send</button>
          <button onClick={getCsv}>Download</button>
        </header>
      </div>
  );
}
function LogIn(){
  const [usernameVal,setUsername]=useState();
  const [passwordVal,setPassword]=useState();
  let navigate=useNavigate();

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
      }).then((response) => response.text()).then((json) => console.log(json));

      console.log("username = "+usernameVal);
      console.log("password = "+passwordVal);
      setUsername();
      setPassword();
      navigate("/home");
    }
    
  }
  return (
    <LoginPage style={{ minHeight: 800 }}>
      <Username value={usernameVal} onChange={e => setUsername(e.target.value)}></Username>
      <Password value={passwordVal} onChange={e => setPassword(e.target.value)}></Password>
      <Submit onClick={loginSend} >Log in</Submit>
    </LoginPage>
  );
}

function ExerciseInputBoxes({exerciseVal,setExercise,weightVal,setWeight,repsVal,setReps,reserveVal,setReserve,idVal,setId}) {
  
  return (
    
    <div style={{display:'flex'}}>
      <div >
        <div>
          <label>ID</label>
        </div>
        <div>
          <select class="boxes" value={idVal} onChange={e => setId(e.target.value)}>
            <option value="Tomek">Tomek</option>
            <option value="Mikolaj">Mikolaj</option>
            <option value="Test">Test</option>
          </select>
        </div>
      </div>
      <div >
        <div>
          <label>Excersize</label>
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

