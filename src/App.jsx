import { useState } from 'react'
import QuizPage from './Components/QuizPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='continer'>
        <h1 style={{textDecoration:"underline"}}> Quizzicle!</h1>
        <QuizPage />  
      </div>
    </>
  )
}

export default App
