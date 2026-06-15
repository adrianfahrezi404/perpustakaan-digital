<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserBookResource;
use App\Models\UserBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LibraryController extends Controller
{
    /**
     * All user's library books with optional status filter.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = $request->user()->userBooks()->with('book.category');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return UserBookResource::collection($query->latest()->paginate(12));
    }

    public function reading(Request $request): AnonymousResourceCollection
    {
        $books = $request->user()->userBooks()
            ->where('status', 'reading')
            ->with('book.category')
            ->latest()
            ->get();

        return UserBookResource::collection($books);
    }

    public function completed(Request $request): AnonymousResourceCollection
    {
        $books = $request->user()->userBooks()
            ->where('status', 'completed')
            ->with('book.category')
            ->latest()
            ->get();

        return UserBookResource::collection($books);
    }

    public function wishlist(Request $request): AnonymousResourceCollection
    {
        $books = $request->user()->userBooks()
            ->where('status', 'wishlist')
            ->with('book.category')
            ->latest()
            ->get();

        return UserBookResource::collection($books);
    }

    public function favorites(Request $request): AnonymousResourceCollection
    {
        $books = $request->user()->userBooks()
            ->where('status', 'favorite')
            ->with('book.category')
            ->latest()
            ->get();

        return UserBookResource::collection($books);
    }

    public function archive(Request $request): AnonymousResourceCollection
    {
        $books = $request->user()->userBooks()
            ->where('status', 'archive')
            ->with('book.category')
            ->latest()
            ->get();

        return UserBookResource::collection($books);
    }

    /**
     * Add a book to user's library.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'status' => 'required|in:reading,wishlist,favorite',
        ]);

        $userBook = $request->user()->userBooks()->create([
            'book_id' => $validated['book_id'],
            'status' => $validated['status'],
        ]);

        $userBook->load('book.category');

        return response()->json([
            'message' => 'Buku berhasil ditambahkan ke perpustakaan.',
            'data' => new UserBookResource($userBook),
        ], 201);
    }

    /**
     * Update status or progress of a library book.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $userBook = $request->user()->userBooks()->findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:reading,completed,wishlist,favorite,archive',
            'progress' => 'sometimes|integer|min:0|max:100',
            'rating' => 'sometimes|integer|min:1|max:5',
        ]);

        $userBook->update($validated);
        $userBook->load('book.category');

        return response()->json([
            'message' => 'Data buku berhasil diperbarui.',
            'data' => new UserBookResource($userBook),
        ]);
    }

    /**
     * Remove a book from user's library.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $userBook = $request->user()->userBooks()->findOrFail($id);
        $userBook->delete();

        return response()->json(null, 204);
    }
}
