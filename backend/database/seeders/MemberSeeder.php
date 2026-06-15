<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 active members
        User::factory()->count(17)->create();

        // Create 3 inactive (pending approval) members
        User::factory()->count(3)->inactive()->create();
    }
}
