import axios from 'axios';
import './App.css';
import React, {useState} from 'react';

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    
    const payload = {
      language: "cpp",
      code
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setError('');
      setOutput(data.output);
    } catch(err) {
      setOutput('');
      setError(err.response.data.err.stderr);
      console.log(err.response);
    }
  }

  return (
    <div className="App">
      <h1>Online GCC Compiler</h1>
      <div className='layout'>
        <div>
          <textarea 
            rows="20" 
            cols="75" 
            value={code} 
            className="text-area"
            onChange={(e)=>{setCode(e.target.value)}}
            >
          </textarea>
          <br />
          <button className='button' onClick={handleSubmit}>Run Code</button>
        </div>

        <div className='output'>
          <p>{output}</p>
          <p>{error}</p>
        </div>
      
      </div>
    </div>
  );
}

export default App;
