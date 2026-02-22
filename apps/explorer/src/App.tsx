import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/SkipLink';
import { ViewerShell } from '@/components/ViewerShell';
import { LoadingHUD } from '@/components/LoadingHUD';

function App() {
  return (
    <ErrorBoundary>
      <SkipLink />
      <Routes>
        <Route path="/" element={<ViewerShell />} />
        <Route path="/community/:communityId" element={<ViewerShell />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      <LoadingHUD />
    </ErrorBoundary>
  );
}

export default App;
