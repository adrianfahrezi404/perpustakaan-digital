<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['reading', 'completed', 'wishlist', 'favorite', 'archive']);
            $table->integer('progress')->default(0);
            $table->tinyInteger('rating')->nullable();
            $table->boolean('reviewed')->default(false);
            $table->timestamps();
            $table->unique(['user_id', 'book_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_books');
    }
};
