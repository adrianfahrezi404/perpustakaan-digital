<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class LoanSeeder extends Seeder
{
    public function run(): void
    {
        $members = User::where('role', 'member')->where('is_active', true)->get();
        $books = Book::all();

        // 15 active loans (dipinjam)
        for ($i = 0; $i < 15; $i++) {
            $loanDate = Carbon::today()->subDays(fake()->numberBetween(1, 10));
            Loan::create([
                'user_id' => $members->random()->id,
                'book_id' => $books->random()->id,
                'loan_date' => $loanDate,
                'due_date' => $loanDate->copy()->addDays(14),
                'status' => 'dipinjam',
            ]);
        }

        // 10 returned loans (kembali)
        for ($i = 0; $i < 10; $i++) {
            $loanDate = Carbon::today()->subDays(fake()->numberBetween(20, 60));
            $returnDate = $loanDate->copy()->addDays(fake()->numberBetween(7, 13));
            Loan::create([
                'user_id' => $members->random()->id,
                'book_id' => $books->random()->id,
                'loan_date' => $loanDate,
                'due_date' => $loanDate->copy()->addDays(14),
                'return_date' => $returnDate,
                'status' => 'kembali',
            ]);
        }

        // 5 overdue loans (terlambat)
        for ($i = 0; $i < 5; $i++) {
            $loanDate = Carbon::today()->subDays(fake()->numberBetween(20, 40));
            $dueDate = $loanDate->copy()->addDays(14);
            $daysLate = fake()->numberBetween(3, 15);
            $fineAmount = $daysLate * 1000;

            Loan::create([
                'user_id' => $members->random()->id,
                'book_id' => $books->random()->id,
                'loan_date' => $loanDate,
                'due_date' => $dueDate,
                'return_date' => $dueDate->copy()->addDays($daysLate),
                'status' => 'terlambat',
                'fine_amount' => $fineAmount,
                'fine_paid' => fake()->boolean(40),
            ]);
        }
    }
}
