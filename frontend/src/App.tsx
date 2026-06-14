import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Landing from './pages/Landing';
import BookDetails from './pages/BookDetails';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import AdminDashboard from './pages/admin/AdminDashboard';
import CatalogManagement from './pages/admin/CatalogManagement';
import MemberManagement from './pages/admin/MemberManagement';
import LoanManagement from './pages/admin/LoanManagement';
import Reports from './pages/admin/Reports';
import AdminSettings from './pages/admin/AdminSettings';

import LibraryLayout from './layouts/LibraryLayout';
import LibraryAllBooks from './pages/library/LibraryAllBooks';
import LibraryWishlist from './pages/library/LibraryWishlist';
import LibraryArchive from './pages/library/LibraryArchive';
import LibraryFavorites from './pages/library/LibraryFavorites';
import LibraryCompleted from './pages/library/LibraryCompleted';
import LibraryReading from './pages/library/LibraryReading';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Member Routes (Public/Standard) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="book/:id" element={<BookDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Boutique Archive (Library Dashboard) */}
          <Route path="/library" element={<LibraryLayout />}>
            <Route index element={<LibraryAllBooks />} />
            <Route path="completed" element={<LibraryCompleted />} />
            <Route path="wishlist" element={<LibraryWishlist />} />
            <Route path="favorites" element={<LibraryFavorites />} />
            <Route path="archive" element={<LibraryArchive />} />
            <Route path="reading" element={<LibraryReading />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<CatalogManagement />} />
            <Route path="members" element={<MemberManagement />} />
            <Route path="loans" element={<LoanManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
