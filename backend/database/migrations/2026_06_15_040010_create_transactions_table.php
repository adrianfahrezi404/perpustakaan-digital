<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_id')->nullable()->constrained()->onDelete('set null');
            $table->date('date');
            $table->string('description');
            $table->enum('category', ['denda', 'pendapatan', 'operasional', 'pendapatan_lain']);
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['lunas', 'pending'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
