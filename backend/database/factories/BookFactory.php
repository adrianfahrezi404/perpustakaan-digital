<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'isbn' => fake()->unique()->isbn13(),
            'synopsis' => fake()->paragraphs(3, true),
            'category_id' => Category::inRandomOrder()->first()?->id ?? 1,
            'cover' => null,
            'type' => fake()->randomElement(['fisik', 'digital']),
            'stock' => fake()->numberBetween(1, 20),
            'pages' => fake()->numberBetween(100, 500),
            'publish_year' => fake()->numberBetween(2000, 2026),
            'publisher' => fake()->company(),
            'price' => fake()->numberBetween(25, 150) * 1000,
            'rating' => fake()->randomFloat(2, 3.0, 5.0),
            'reviews_count' => fake()->numberBetween(0, 100),
            'status' => 'tersedia',
        ];
    }
}
