<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApprovalResource;
use App\Models\Approval;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminApprovalController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $approvals = Approval::with(['user', 'book'])
            ->where('status', 'pending')
            ->latest()
            ->paginate(15);

        return ApprovalResource::collection($approvals);
    }

    public function approve(int $id): JsonResponse
    {
        $approval = Approval::with(['user', 'book'])->findOrFail($id);

        if ($approval->status !== 'pending') {
            return response()->json(['message' => 'Approval sudah diproses.'], 422);
        }

        $approval->update(['status' => 'approved']);

        // Process based on type
        if (in_array($approval->type, ['reservasi_fisik', 'akses_digital'])) {
            Loan::create([
                'user_id' => $approval->user_id,
                'book_id' => $approval->book_id,
                'loan_date' => Carbon::today(),
                'due_date' => Carbon::today()->addDays(14),
                'status' => 'dipinjam',
            ]);
        }

        return response()->json([
            'message' => 'Approval berhasil disetujui.',
            'data' => new ApprovalResource($approval),
        ]);
    }

    public function reject(int $id): JsonResponse
    {
        $approval = Approval::with(['user', 'book'])->findOrFail($id);

        if ($approval->status !== 'pending') {
            return response()->json(['message' => 'Approval sudah diproses.'], 422);
        }

        $approval->update([
            'status' => 'rejected',
            'notes' => request('notes', 'Ditolak oleh admin.'),
        ]);

        return response()->json([
            'message' => 'Approval berhasil ditolak.',
            'data' => new ApprovalResource($approval),
        ]);
    }
}
