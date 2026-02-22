import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AssetsPage } from '@/pages/AssetsPage';
import { CommunitiesPage } from '@/pages/CommunitiesPage';

function Layout() {
  const loc = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="font-semibold text-slate-900">Bryto Backoffice</h1>
        <nav className="flex gap-4" aria-label="Main navigation">
          <Link
            to="/"
            className={`text-sm font-medium ${loc.pathname === '/' ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Communities
          </Link>
          <Link
            to="/assets"
            className={`text-sm font-medium ${loc.pathname.startsWith('/assets') ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Assets
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<CommunitiesPage />} />
          <Route path="/assets" element={<AssetsPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout />} />
    </Routes>
  );
}

export default App;
