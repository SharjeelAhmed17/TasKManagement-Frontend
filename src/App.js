import { BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </DndProvider>
  );
}

export default App;
