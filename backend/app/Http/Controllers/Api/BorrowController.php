<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoanResource;
use App\Models\Activity;
use App\Models\Book;
use App\Models\Loan;
use App\Models\UserBook;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BorrowController extends Controller
{
    /**
     * Borrow a book.
     */
    public function borrow(Request $request, int $bookId): JsonResponse
    {
        $book = Book::findOrFail($bookId);
        $user = $request->user();

        // Check if user already has an active loan for this book
        $existingLoan = Loan::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('status', 'dipinjam')
            ->first();

        if ($existingLoan) {
            return response()->json(['message' => 'Anda sudah meminjam buku ini.'], 422);
        }

        // Check availability
        if ($book->type === 'fisik' && $book->stock <= 0) {
            return response()->json(['message' => 'Stok buku habis.'], 422);
        }

        $loan = Loan::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'loan_date' => Carbon::today(),
            'due_date' => Carbon::today()->addDays(14),
            'status' => 'dipinjam',
        ]);

        // Update stock for physical books
        if ($book->type === 'fisik') {
            $book->decrement('stock');
            if ($book->stock <= 0) {
                $book->update(['status' => 'habis']);
            }
        }

        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'borrow',
            'description' => "Meminjam buku \"{$book->title}\"",
            'icon' => '📖',
        ]);

        // Add to user library as reading
        UserBook::firstOrCreate(
            ['user_id' => $user->id, 'book_id' => $bookId, 'status' => 'reading'],
            ['progress' => 0]
        );

        $loan->load(['user', 'book']);

        return response()->json([
            'message' => 'Buku berhasil dipinjam.',
            'data' => new LoanResource($loan),
        ], 201);
    }

    /**
     * Return a book.
     */
    public function returnBook(Request $request, int $bookId): JsonResponse
    {
        $user = $request->user();
        $loan = Loan::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('status', 'dipinjam')
            ->firstOrFail();

        $loan->return_date = Carbon::today();
        $loan->status = $loan->isOverdue() ? 'terlambat' : 'kembali';
        $loan->fine_amount = $loan->calculateFine();
        $loan->save();

        // Restore stock
        $book = $loan->book;
        if ($book->type === 'fisik') {
            $book->increment('stock');
            if ($book->status === 'habis') {
                $book->update(['status' => 'tersedia']);
            }
        }

        // Log activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'return',
            'description' => "Mengembalikan buku \"{$book->title}\"",
            'icon' => '📚',
        ]);

        $loan->load(['user', 'book']);

        return response()->json([
            'message' => 'Buku berhasil dikembalikan.',
            'data' => new LoanResource($loan),
        ]);
    }

    /**
     * Toggle book in wishlist.
     */
    public function toggleWishlist(Request $request, int $bookId): JsonResponse
    {
        Book::findOrFail($bookId);
        $user = $request->user();

        $existing = UserBook::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('status', 'wishlist')
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['wishlisted' => false, 'message' => 'Buku dihapus dari wishlist.']);
        }

        UserBook::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'status' => 'wishlist',
        ]);

        return response()->json(['wishlisted' => true, 'message' => 'Buku ditambahkan ke wishlist.']);
    }

    /**
     * Toggle book as favorite.
     */
    public function toggleFavorite(Request $request, int $bookId): JsonResponse
    {
        Book::findOrFail($bookId);
        $user = $request->user();

        $existing = UserBook::where('user_id', $user->id)
            ->where('book_id', $bookId)
            ->where('status', 'favorite')
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['favorited' => false, 'message' => 'Buku dihapus dari favorit.']);
        }

        UserBook::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'status' => 'favorite',
        ]);

        return response()->json(['favorited' => true, 'message' => 'Buku ditambahkan ke favorit.']);
    }
}
