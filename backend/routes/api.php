<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BorrowController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\LibraryController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\Admin\AdminApprovalController;
use App\Http\Controllers\Api\Admin\AdminBookController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminLoanController;
use App\Http\Controllers\Api\Admin\AdminMemberController;
use App\Http\Controllers\Api\Admin\AdminReportController;
use App\Http\Controllers\Api\Admin\AdminSettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/

Route::get('/books', [BookController::class, 'index']);
Route::get('/books/popular', [BookController::class, 'popular']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::get('/books/{id}/reviews', [BookController::class, 'reviews']);
Route::get('/books/{id}/recommendations', [BookController::class, 'recommendations']);
Route::get('/categories', [CategoryController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Authentication Required)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);

    // User Library
    Route::prefix('library')->group(function () {
        Route::get('/books', [LibraryController::class, 'index']);
        Route::get('/reading', [LibraryController::class, 'reading']);
        Route::get('/completed', [LibraryController::class, 'completed']);
        Route::get('/wishlist', [LibraryController::class, 'wishlist']);
        Route::get('/favorites', [LibraryController::class, 'favorites']);
        Route::get('/archive', [LibraryController::class, 'archive']);
        Route::post('/books', [LibraryController::class, 'store']);
        Route::put('/books/{id}', [LibraryController::class, 'update']);
        Route::delete('/books/{id}', [LibraryController::class, 'destroy']);
    });

    // Borrow Actions
    Route::post('/books/{id}/borrow', [BorrowController::class, 'borrow']);
    Route::post('/books/{id}/return', [BorrowController::class, 'returnBook']);
    Route::post('/books/{id}/wishlist', [BorrowController::class, 'toggleWishlist']);
    Route::post('/books/{id}/favorite', [BorrowController::class, 'toggleFavorite']);

    // Reviews
    Route::post('/books/{id}/reviews', [ReviewController::class, 'store']);

    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar']);

    /*
    |--------------------------------------------------------------------------
    | Admin Routes (Admin Role Required)
    |--------------------------------------------------------------------------
    */

    Route::middleware('admin')->prefix('admin')->group(function () {

        // Dashboard
        Route::get('/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/loan-trends', [AdminDashboardController::class, 'loanTrends']);
        Route::get('/popular-books', [AdminDashboardController::class, 'popularBooks']);

        // Book Management
        Route::get('/books', [AdminBookController::class, 'index']);
        Route::post('/books', [AdminBookController::class, 'store']);
        Route::put('/books/{id}', [AdminBookController::class, 'update']);
        Route::delete('/books/{id}', [AdminBookController::class, 'destroy']);

        // Member Management
        Route::get('/members', [AdminMemberController::class, 'index']);
        Route::post('/members', [AdminMemberController::class, 'store']);
        Route::post('/members/{id}/activate', [AdminMemberController::class, 'activate']);
        Route::post('/members/{id}/deactivate', [AdminMemberController::class, 'deactivate']);
        Route::get('/member-stats', [AdminMemberController::class, 'stats']);

        // Loan Management
        Route::get('/loans', [AdminLoanController::class, 'index']);
        Route::post('/loans', [AdminLoanController::class, 'store']);
        Route::post('/loans/{id}/return', [AdminLoanController::class, 'markReturned']);
        Route::post('/loans/{id}/pay-fine', [AdminLoanController::class, 'markFinePaid']);

        // Approvals
        Route::get('/approvals', [AdminApprovalController::class, 'index']);
        Route::post('/approvals/{id}/approve', [AdminApprovalController::class, 'approve']);
        Route::post('/approvals/{id}/reject', [AdminApprovalController::class, 'reject']);

        // Reports
        Route::get('/reports/revenue', [AdminReportController::class, 'revenue']);
        Route::get('/reports/transactions', [AdminReportController::class, 'transactions']);

        // Settings
        Route::get('/settings', [AdminSettingController::class, 'index']);
        Route::put('/settings', [AdminSettingController::class, 'update']);
    });
});
