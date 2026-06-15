// ============================================
// Data Models — Perpustakaan Digital
// Matches Laravel API Resource responses
// ============================================

// ---- Auth & User ----

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  member_id: string | null;
  avatar_url: string | null;
  tagline: string | null;
  status: 'active' | 'inactive';
  is_active: boolean;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

// ---- Books ----

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  synopsis: string | null;
  category: Category;
  cover_url: string | null;
  type: 'fisik' | 'digital';
  stock: number;
  pages: number;
  publish_year: number | null;
  publisher: string | null;
  price: number;
  rating: number;
  reviews_count: number;
  status: 'tersedia' | 'dipinjam' | 'habis';
  tags: Tag[];
  created_at: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  synopsis?: string;
  category_id: number;
  type: 'fisik' | 'digital';
  stock: number;
  pages: number;
  publish_year?: number;
  publisher?: string;
  price: number;
  cover?: File;
  pdf_file?: File;
  tags?: number[];
}

// ---- Categories & Tags ----

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  books_count?: number;
}

export interface Tag {
  id: number;
  name: string;
}

// ---- Loans ----

export interface Loan {
  id: number;
  user: User;
  book: Book;
  loan_date: string;
  due_date: string;
  return_date: string | null;
  status: 'dipinjam' | 'kembali' | 'terlambat';
  fine_amount: number;
  notes: string | null;
  created_at: string;
}

// ---- Reviews ----

export interface Review {
  id: number;
  user: Pick<User, 'id' | 'name' | 'avatar_url'>;
  rating: number;
  comment: string;
  created_at: string;
}

// ---- User Library ----

export type UserBookStatus = 'reading' | 'completed' | 'wishlist' | 'favorite' | 'archive';

export interface UserBook {
  id: number;
  book: Book;
  status: UserBookStatus;
  progress: number;
  rating: number | null;
  reviewed: boolean;
  created_at: string;
  updated_at: string;
}

// ---- Activities & Badges ----

export interface Activity {
  id: number;
  type: string;
  description: string;
  icon: string | null;
  created_at: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string | null;
  earned_at?: string;
}

// ---- User Profile ----

export interface UserProfile {
  user: User;
  stats: {
    books_read: number;
    favorites: number;
    following: number;
  };
  activities: Activity[];
  badges: Badge[];
}

// ---- Approvals ----

export type ApprovalType = 'reservasi_fisik' | 'akses_digital' | 'pengembalian_fisik';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Approval {
  id: number;
  user: Pick<User, 'id' | 'name' | 'email'>;
  book: Pick<Book, 'id' | 'title' | 'author'>;
  type: ApprovalType;
  status: ApprovalStatus;
  notes: string | null;
  created_at: string;
}

// ---- Transactions ----

export type TransactionCategory = 'denda' | 'pendapatan' | 'operasional' | 'pendapatan_lain';
export type TransactionStatus = 'lunas' | 'pending';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: TransactionCategory;
  amount: number;
  status: TransactionStatus;
}

// ---- Settings ----

export interface LibrarySettings {
  name: string;
  address: string;
  contact_email: string;
  max_books: number;
  loan_duration: number;
  fine_per_day: number;
  auto_backup_frequency: 'daily' | 'weekly' | 'monthly';
}

// ---- Admin Dashboard ----

export interface DashboardStats {
  total_books: number;
  total_members: number;
  active_loans: number;
  monthly_revenue: number;
  books_change: number;
  members_change: number;
  loans_change: number;
  revenue_change: number;
}

export interface LoanTrend {
  month: string;
  loans: number;
  returns: number;
}

export interface MemberStats {
  total: number;
  active: number;
  inactive: number;
  new_this_month: number;
}

// ---- API Pagination ----

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// ---- API Error ----

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
