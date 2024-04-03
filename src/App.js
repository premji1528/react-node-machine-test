import './App.css';
import StudentContextWrapper from './context/studentContext';
import StudentList from './pages/studentsList';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row pt-4'>
          <div className='col-10'>
            <StudentContextWrapper>
              <StudentList />
            </StudentContextWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
