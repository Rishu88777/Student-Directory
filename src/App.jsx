import { useEffect } from 'react';
import './App.css';
import StudentTable from './component/StudentTable';
import StudentData from './json/Student.json';

function App() {
  useEffect(() => {
    localStorage.setItem('student', JSON.stringify(StudentData))
  }, [])
  return (
    <div className="App">
      <StudentTable />
    </div>
  );
}

export default App;
