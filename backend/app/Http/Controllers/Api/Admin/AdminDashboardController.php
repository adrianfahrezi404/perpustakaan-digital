<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $now = Carbon::now();
        $lastMonth = $now->copy()->subMonth();

        $totalBooks = Book::count();
        $totalMembers = User::where('role', 'member')->count();
        $activeLoans = Loan::where('status', 'dipinjam')->count();
        $monthlyRevenue = Transaction::whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->where('status', 'lunas')
            ->sum('amount');

        // Previous month for comparison
        $prevBooks = Book::where('created_at', '<', $now->startOfMonth())->count();
        $prevMembers = User::where('role', 'member')
            ->where('created_at', '<', $now->startOfMonth())->count();
        $prevLoans = Loan::where('status', 'dipinjam')
            ->where('created_at', '<', $now->startOfMonth())->count();
        $prevRevenue = Transaction::whereMonth('date', $lastMonth->month)
            ->whereYear('date', $lastMonth->year)
            ->where('status', 'lunas')
            ->sum('amount');

        return response()->json([
            'data' => [
                'total_books' => $totalBooks,
                'total_members' => $totalMembers,
                'active_loans' => $activeLoans,
                'monthly_revenue' => (float) $monthlyRevenue,
                'books_change' => $prevBooks > 0 ? round(($totalBooks - $prevBooks) / $prevBooks * 100, 1) : 0,
                'members_change' => $prevMembers > 0 ? round(($totalMembers - $prevMembers) / $prevMembers * 100, 1) : 0,
                'loans_change' => $prevLoans > 0 ? round(($activeLoans - $prevLoans) / $prevLoans * 100, 1) : 0,
                'revenue_change' => $prevRevenue > 0 ? round(($monthlyRevenue - $prevRevenue) / $prevRevenue * 100, 1) : 0,
            ],
        ]);
    }

    public function loanTrends(): JsonResponse
    {
        $trends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $trends[] = [
                'month' => $date->translatedFormat('M Y'),
                'loans' => Loan::whereMonth('loan_date', $date->month)
                    ->whereYear('loan_date', $date->year)->count(),
                'returns' => Loan::whereMonth('return_date', $date->month)
                    ->whereYear('return_date', $date->year)->count(),
            ];
        }

        return response()->json(['data' => $trends]);
    }

    public function popularBooks(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $books = Book::with('category')
            ->withCount('loans')
            ->orderByDesc('loans_count')
            ->limit(5)
            ->get();

        return BookResource::collection($books);
    }
}
