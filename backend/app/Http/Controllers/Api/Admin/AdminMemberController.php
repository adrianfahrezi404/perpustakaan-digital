<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminMemberController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = User::where('role', 'member');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('email', 'ILIKE', "%{$search}%")
                  ->orWhere('member_id', 'ILIKE', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        return UserResource::collection($query->latest()->paginate(15));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            ...$validated,
            'role' => 'member',
            'is_active' => true,
            'status' => 'active',
            'member_id' => 'LIB-' . str_pad(random_int(1, 999999), 6, '0', STR_PAD_LEFT),
        ]);

        return response()->json([
            'message' => 'Anggota berhasil ditambahkan.',
            'data' => new UserResource($user),
        ], 201);
    }

    public function activate(int $id): JsonResponse
    {
        $user = User::where('role', 'member')->findOrFail($id);
        $user->update(['is_active' => true]);

        return response()->json([
            'message' => 'Anggota berhasil diaktifkan.',
            'data' => new UserResource($user),
        ]);
    }

    public function deactivate(int $id): JsonResponse
    {
        $user = User::where('role', 'member')->findOrFail($id);
        $user->update(['is_active' => false]);

        return response()->json([
            'message' => 'Anggota berhasil dinonaktifkan.',
            'data' => new UserResource($user),
        ]);
    }

    public function stats(): JsonResponse
    {
        $now = Carbon::now();

        return response()->json([
            'data' => [
                'total' => User::where('role', 'member')->count(),
                'active' => User::where('role', 'member')->where('is_active', true)->count(),
                'inactive' => User::where('role', 'member')->where('is_active', false)->count(),
                'new_this_month' => User::where('role', 'member')
                    ->whereMonth('created_at', $now->month)
                    ->whereYear('created_at', $now->year)
                    ->count(),
            ],
        ]);
    }
}
