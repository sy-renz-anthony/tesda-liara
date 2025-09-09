import { Routes, Route} from 'react-router-dom';

import PublicHome from './pages/PublicHome';

function App() {
  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<PublicHome />} />
      </Routes>
    </div>
  )
}

export default App