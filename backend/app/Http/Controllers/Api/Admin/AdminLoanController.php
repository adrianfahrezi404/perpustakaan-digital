<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoanResource;
use App\Models\Loan;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminLoanController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Loan::with(['user', 'book']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', fn ($q) => $q->where('name', 'ILIKE', "%{$search}%"))
                  ->orWhereHas('book', fn ($q) => $q->where('title', 'ILIKE', "%{$search}%"));
            });
        }

        return LoanResource::collection($query->latest()->paginate(15));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'loan_date' => 'required|date',
            'due_date' => 'required|date|after:loan_date',
        ]);

        $loan = Loan::create([
            ...$validated,
            'status' => 'dipinjam',
        ]);

        $loan->load(['user', 'book']);

        return response()->json([
            'message' => 'Peminjaman berhasil dibuat.',
            'data' => new LoanResource($loan),
        ], 201);
    }

    public function markReturned(int $id): JsonResponse
    {
        $loan = Loan::with(['user', 'book'])->findOrFail($id);

        $loan->return_date = Carbon::today();
        $loan->status = $loan->isOverdue() ? 'terlambat' : 'kembali';
        $loan->fine_amount = $loan->calculateFine();
        $loan->save();

        // Restore stock
        if ($loan->book->type === 'fisik') {
            $loan->book->increment('stock');
            if ($loan->book->status === 'habis') {
                $loan->book->update(['status' => 'tersedia']);
            }
        }

        return response()->json([
            'message' => 'Buku berhasil ditandai dikembalikan.',
            'data' => new LoanResource($loan),
        ]);
    }

    public function markFinePaid(int $id): JsonResponse
    {
        $loan = Loan::with(['user', 'book'])->findOrFail($id);

        if ($loan->fine_amount <= 0) {
            return response()->json(['message' => 'Tidak ada denda untuk peminjaman ini.'], 422);
        }

        $loan->update(['fine_paid' => true]);

        // Create transaction record
        Transaction::create([
            'loan_id' => $loan->id,
            'date' => Carbon::today(),
            'description' => "Pembayaran denda - {$loan->book->title} ({$loan->user->name})",
            'category' => 'denda',
            'amount' => $loan->fine_amount,
            'status' => 'lunas',
        ]);

        return response()->json([
            'message' => 'Denda berhasil ditandai lunas.',
            'data' => new LoanResource($loan),
        ]);
    }
}
