<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminReportController extends Controller
{
    public function revenue(): JsonResponse
    {
        $now = Carbon::now();

        $totalRevenue = Transaction::where('status', 'lunas')->sum('amount');
        $monthlyRevenue = Transaction::where('status', 'lunas')
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->sum('amount');
        $totalFines = Transaction::where('category', 'denda')
            ->where('status', 'lunas')
            ->sum('amount');

        // Monthly trend (last 6 months)
        $trends = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = $now->copy()->subMonths($i);
            $trends[] = [
                'month' => $date->translatedFormat('M Y'),
                'revenue' => (float) Transaction::where('status', 'lunas')
                    ->whereMonth('date', $date->month)
                    ->whereYear('date', $date->year)
                    ->sum('amount'),
            ];
        }

        return response()->json([
            'data' => [
                'total_revenue' => (float) $totalRevenue,
                'monthly_revenue' => (float) $monthlyRevenue,
                'total_fines' => (float) $totalFines,
                'trends' => $trends,
            ],
        ]);
    }

    public function transactions(Request $request): AnonymousResourceCollection
    {
        $query = Transaction::query();

        if ($category = $request->input('category')) {
            $query->where('category', $category);
        }

        if ($from = $request->input('from')) {
            $query->whereDate('date', '>=', $from);
        }

        if ($to = $request->input('to')) {
            $query->whereDate('date', '<=', $to);
        }

        return TransactionResource::collection($query->latest('date')->paginate(15));
    }
}
