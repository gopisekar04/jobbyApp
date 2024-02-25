import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { redirect } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Job from './components/Job'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="jobs" element={<Jobs employmentTypesList={employmentTypesList} salaryRangesList={salaryRangesList} />}></Route>
      <Route path='/jobs/:id' element={<Job />} />      
      <Route path='*'  element={<NotFound />}></Route>      
    </Routes>
  </BrowserRouter>
}

export default App
