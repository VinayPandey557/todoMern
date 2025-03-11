import { BrowserRouter, Routes, Route  } from "react-router-dom"
import { Home } from "./Components/Home"
import { Signup } from "./Components/Signup"
import { Signin } from "./Components/Signin"
import { CreateTodo } from "./Components/CreateTodo"
import { DisplayTodo } from "./Components/DisplayTodo"


function App() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />}></Route>
     <Route path="/signup" element={<Signup /> }></Route>
     <Route path="/signin" element={<Signin /> }></Route>
     <Route path="/todo" element={<CreateTodo />}></Route>
     <Route path="/todos" element={<DisplayTodo/>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
