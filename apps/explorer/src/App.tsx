import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Community Explorer</div>} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;
