<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, int $bookId): JsonResponse
    {
        $book = Book::findOrFail($bookId);
        $user = $request->user();

        $existing = Review::where('user_id', $user->id)->where('book_id', $bookId)->first();
        if ($existing) {
            return response()->json(['message' => 'Anda sudah memberikan review untuk buku ini.'], 422);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = Review::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        // Update book average rating and count
        $book->reviews_count = $book->reviews()->count();
        $book->rating = $book->reviews()->avg('rating') ?? 0;
        $book->save();

        $review->load('user');

        return response()->json([
            'message' => 'Review berhasil ditambahkan.',
            'data' => new ReviewResource($review),
        ], 201);
    }
}
