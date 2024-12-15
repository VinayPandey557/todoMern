import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';
import { CreateTodo } from './components/createTodo';
import { Signin } from "./components/Signin";




function App() {
  return <div>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/signup' element={<SignUp />}></Route>
    <Route path='signin' element={<Signin />}></Route>
    <Route path='/todo' element={ <CreateTodo />}></Route>
   </Routes>
   </BrowserRouter>
  </div>
}

export default App
