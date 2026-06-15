<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Http\Resources\ReviewResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BookController extends Controller
{
    /**
     * List books with search, category filter, and pagination.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Book::with('category');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                  ->orWhere('author', 'ILIKE', "%{$search}%");
            });
        }

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $books = $query->latest()->paginate($request->input('per_page', 12));

        return BookResource::collection($books);
    }

    /**
     * Popular books for landing page (top 8 by rating).
     */
    public function popular(): AnonymousResourceCollection
    {
        $books = Book::with('category')
            ->orderByDesc('rating')
            ->orderByDesc('reviews_count')
            ->limit(8)
            ->get();

        return BookResource::collection($books);
    }

    /**
     * Show a single book with details.
     */
    public function show(int $id): BookResource
    {
        $book = Book::with(['category', 'tags'])->findOrFail($id);
        return new BookResource($book);
    }

    /**
     * Get reviews for a book.
     */
    public function reviews(int $id): AnonymousResourceCollection
    {
        $book = Book::findOrFail($id);
        $reviews = $book->reviews()
            ->with('user')
            ->latest()
            ->paginate(10);

        return ReviewResource::collection($reviews);
    }

    /**
     * Get book recommendations (same category).
     */
    public function recommendations(int $id): AnonymousResourceCollection
    {
        $book = Book::findOrFail($id);

        $recommendations = Book::with('category')
            ->where('category_id', $book->category_id)
            ->where('id', '!=', $book->id)
            ->orderByDesc('rating')
            ->limit(4)
            ->get();

        return BookResource::collection($recommendations);
    }
}
