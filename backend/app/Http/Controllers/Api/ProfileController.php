<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        $stats = [
            'books_read' => $user->userBooks()->where('status', 'completed')->count(),
            'favorites' => $user->userBooks()->where('status', 'favorite')->count(),
            'following' => 0,
        ];

        $activities = $user->activities()->latest()->limit(10)->get();
        $badges = $user->badges()->get();

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
                'stats' => $stats,
                'activities' => $activities,
                'badges' => $badges,
            ],
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'tagline' => 'sometimes|string|max:255|nullable',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'data' => new UserResource($request->user()),
        ]);
    }

    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $user = $request->user();

        // Delete old avatar
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return response()->json([
            'message' => 'Avatar berhasil diperbarui.',
            'data' => new UserResource($user),
        ]);
    }
}
