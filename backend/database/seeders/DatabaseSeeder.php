<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Order matters: categories/tags first, then users, then books, then relations.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            TagSeeder::class,
            AdminSeeder::class,
            MemberSeeder::class,
            BookSeeder::class,
            BadgeSeeder::class,
            LoanSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
