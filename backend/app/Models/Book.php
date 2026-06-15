<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author', 'isbn', 'synopsis', 'category_id',
        'cover', 'pdf_file', 'type', 'stock', 'pages',
        'publish_year', 'publisher', 'price', 'rating',
        'reviews_count', 'status',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'rating' => 'decimal:2',
        ];
    }

    // ---- Accessors ----

    public function getCoverUrlAttribute(): ?string
    {
        if (!$this->cover) return null;
        // Support external URLs (Unsplash) and local storage
        if (str_starts_with($this->cover, 'http')) return $this->cover;
        return Storage::disk('public')->url($this->cover);
    }

    public function getPdfUrlAttribute(): ?string
    {
        if (!$this->pdf_file) return null;
        return Storage::disk('public')->url($this->pdf_file);
    }

    // ---- Relationships ----

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function userBooks(): HasMany
    {
        return $this->hasMany(UserBook::class);
    }
}
