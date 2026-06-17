<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class AdminBookController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Book::with('category', 'tags');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                  ->orWhere('author', 'ILIKE', "%{$search}%")
                  ->orWhere('isbn', 'ILIKE', "%{$search}%");
            });
        }

        if ($categoryId = $request->input('category_id')) {
            $query->where('category_id', $categoryId);
        }

        return BookResource::collection($query->latest()->paginate(15));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|unique:books',
            'synopsis' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'type' => 'required|in:fisik,digital',
            'stock' => 'required|integer|min:0',
            'pages' => 'required|integer|min:0',
            'publish_year' => 'nullable|integer|min:1900|max:2030',
            'publisher' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'cover_link' => 'nullable|url|max:2048',
            'pdf_file' => 'nullable|mimes:pdf|max:20480',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        if ($request->hasFile('cover')) {
            $validated['cover'] = $request->file('cover')->store('covers', 'public');
        } elseif (!empty($validated['cover_link'])) {
            $validated['cover'] = $validated['cover_link'];
        }
        unset($validated['cover_link']);

        if ($request->hasFile('pdf_file')) {
            $validated['pdf_file'] = $request->file('pdf_file')->store('books', 'public');
        }

        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);

        $book = Book::create($validated);

        if (!empty($tags)) {
            $book->tags()->attach($tags);
        }

        $book->load(['category', 'tags']);

        return response()->json([
            'message' => 'Buku berhasil ditambahkan.',
            'data' => new BookResource($book),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'author' => 'sometimes|string|max:255',
            'isbn' => 'nullable|string|unique:books,isbn,' . $id,
            'synopsis' => 'nullable|string',
            'category_id' => 'sometimes|exists:categories,id',
            'type' => 'sometimes|in:fisik,digital',
            'stock' => 'sometimes|integer|min:0',
            'pages' => 'sometimes|integer|min:0',
            'publish_year' => 'nullable|integer|min:1900|max:2030',
            'publisher' => 'nullable|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'cover_link' => 'nullable|url|max:2048',
            'pdf_file' => 'nullable|mimes:pdf|max:20480',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        if ($request->hasFile('cover')) {
            if ($book->cover && !str_starts_with($book->cover, 'http')) {
                Storage::disk('public')->delete($book->cover);
            }
            $validated['cover'] = $request->file('cover')->store('covers', 'public');
        } elseif (!empty($validated['cover_link'])) {
            if ($book->cover && !str_starts_with($book->cover, 'http')) {
                Storage::disk('public')->delete($book->cover);
            }
            $validated['cover'] = $validated['cover_link'];
        }
        unset($validated['cover_link']);

        if ($request->hasFile('pdf_file')) {
            if ($book->pdf_file) {
                Storage::disk('public')->delete($book->pdf_file);
            }
            $validated['pdf_file'] = $request->file('pdf_file')->store('books', 'public');
        }

        if (isset($validated['tags'])) {
            $book->tags()->sync($validated['tags']);
            unset($validated['tags']);
        }

        $book->update($validated);
        $book->load(['category', 'tags']);

        return response()->json([
            'message' => 'Buku berhasil diperbarui.',
            'data' => new BookResource($book),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $book = Book::findOrFail($id);

        // Delete associated files
        if ($book->cover && !str_starts_with($book->cover, 'http')) {
            Storage::disk('public')->delete($book->cover);
        }
        if ($book->pdf_file) {
            Storage::disk('public')->delete($book->pdf_file);
        }

        $book->delete();

        return response()->json(['message' => 'Buku berhasil dihapus.'], 200);
    }
}
