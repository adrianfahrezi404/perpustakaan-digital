<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('isbn')->unique()->nullable();
            $table->text('synopsis')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('cover')->nullable();
            $table->string('pdf_file')->nullable();
            $table->enum('type', ['fisik', 'digital'])->default('fisik');
            $table->integer('stock')->default(0);
            $table->integer('pages')->default(0);
            $table->integer('publish_year')->nullable();
            $table->string('publisher')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('reviews_count')->default(0);
            $table->enum('status', ['tersedia', 'dipinjam', 'habis'])->default('tersedia');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
