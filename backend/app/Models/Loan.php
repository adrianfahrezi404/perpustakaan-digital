<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'book_id', 'loan_date', 'due_date',
        'return_date', 'status', 'fine_amount', 'fine_paid', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'loan_date' => 'date',
            'due_date' => 'date',
            'return_date' => 'date',
            'fine_amount' => 'decimal:2',
            'fine_paid' => 'boolean',
        ];
    }

    // ---- Helpers ----

    /**
     * Check if loan is overdue.
     */
    public function isOverdue(): bool
    {
        return !$this->return_date && Carbon::today()->gt($this->due_date);
    }

    /**
     * Calculate fine based on days late. Rp 1.000 per day.
     */
    public function calculateFine(): float
    {
        $endDate = $this->return_date ?? Carbon::today();
        if ($endDate->lte($this->due_date)) return 0;

        $daysLate = $endDate->diffInDays($this->due_date);
        return $daysLate * 1000;
    }

    // ---- Relationships ----

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class);
    }
}
