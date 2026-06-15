<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            ['name' => 'Pembaca Pemula', 'icon' => '📖', 'description' => 'Membaca buku pertama'],
            ['name' => 'Kutu Buku', 'icon' => '📚', 'description' => 'Membaca 10 buku'],
            ['name' => 'Bibliofil', 'icon' => '🏆', 'description' => 'Membaca 50 buku'],
            ['name' => 'Reviewer Handal', 'icon' => '⭐', 'description' => 'Menulis 10 review'],
            ['name' => 'Penggemar Setia', 'icon' => '❤️', 'description' => 'Aktif selama 1 tahun'],
            ['name' => 'Explorer', 'icon' => '🧭', 'description' => 'Membaca dari 5 kategori berbeda'],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }

        // Assign 2-3 random badges to each member
        $allBadges = Badge::all();
        $members = User::where('role', 'member')->get();

        foreach ($members as $member) {
            $randomBadges = $allBadges->random(fake()->numberBetween(2, 3));
            foreach ($randomBadges as $badge) {
                $member->badges()->attach($badge->id, [
                    'earned_at' => fake()->dateTimeBetween('-6 months', 'now'),
                ]);
            }
        }
    }
}
