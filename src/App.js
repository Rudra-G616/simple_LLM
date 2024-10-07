// import { useState } from "react";

// const App = () => {
//   const [value, setValue] = useState("")
//   const [error, setError] = useState("")
//   const [chatHistory, setChatHistory] = useState([])
//   const [loading, setLoading] = useState(false); // Step 1: Create a loading state
//   const surpriseOptions = [
//     'Who won the latest nobel peace prize?',
//     'Where does pizza come from?',
//     'How do you make a BLT Sandwich?'
//   ]

//   const surprise = () => {
//     const randomValue = Math.floor(Math.random()*surpriseOptions.length)
//     setValue(surpriseOptions[randomValue]);
//   }

//   const clear = () => {
//     setValue("")
//     setError("")
//     setChatHistory([])
//   }

//   const getResponse = async () =>{
//     if (!value) {
//       setError("Please ask something")
//       return
//     }

//     setLoading(true); // Step 2: Set loading state to true

//     try {
//       const options = {
//         method : 'POST',
//         body : JSON.stringify({
//           history: chatHistory,
//           message: value
//         }),
//         headers: {
//           'Content-Type' : 'application/json'
//         }
//       }

//       const response = await fetch('http://localhost:8000/gemini', options)
//       const data = await response.text()
//       console.log(data)
//       setChatHistory(oldChatHistory => [...oldChatHistory, {
//         role:"user",
//         parts: value
//       },{
//         role:"model",
//         part:data
//       }])
//       setValue("")
//     } 
    
//     catch (error) {
//       console.error(error)
//       setError("Something went wrong, Please try again later.")
//     } finally {
//       setLoading(false); // Step 3: Set loading state to false when done
//     }
//   }

//   return (
//       <div className="app">
//         <p>What do you want to know
//         <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise Me!</button>
//         </p>

//         <div className="input-container">
//           <input
//            value={value}
//            placeholder={"When is Christmas...?"}
//            onChange={(e) => setValue(e.target.value)}/>
//            {!error && <button onClick={getResponse}>Ask Me</button>}
//            {error && <button onClick={clear}>Clear</button>}
//         </div>
//         {loading && <p>Loading...</p>} {/* Loader message */}
//         {error && <p>{error}</p>}

//         <div className="search-result">
//           {chatHistory.map((chatItem, _index) => <div key={_index}>
//             <p className="answer">{chatItem.role} : {chatItem.parts}</p>
//           </div>)}

//         </div>
//     </div>
//   );
// }

// export default App

import { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // Step 1: Create a loading state
  const surpriseOptions = [
    'Who won the latest nobel peace prize?',
    'Where does pizza come from?',
    'How do you make a BLT Sandwich?'
  ];

  const surprise = () => {
    const randomValue = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomValue]);
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please ask something");
      return;
    }

    setLoading(true); // Step 2: Set loading state to true

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text();
      console.log(data);

      // Update chat history correctly
      setChatHistory(oldChatHistory => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value // Use `parts` consistently for user message
        },
        {
          role: "model",
          parts: data // Use `parts` consistently for model response
        }
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong, Please try again later.");
    } finally {
      setLoading(false); // Step 3: Set loading state to false when done
    }
  };

  return (
    <div className="app">
      <p>What do you want to know
        <button className="surprise" onClick={surprise}>Surprise Me!</button>
      </p>

      <div className="input-container">
        <input
          value={value}
          placeholder={"When is Christmas...?"}
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask Me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {loading && <p>Loading...</p>} {/* Loader message */}
      {error && <p>{error}</p>}

      <div className="search-result">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index}>
            <p className="answer">{chatItem.role}: {chatItem.parts}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

