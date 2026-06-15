<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'Fiksi', 'Non-Fiksi', 'Bestseller', 'Klasik', 'Modern',
            'Indonesia', 'Terjemahan', 'Anak-anak', 'Remaja', 'Dewasa',
            'Filsafat', 'Motivasi', 'Teknologi', 'Seni', 'Pendidikan',
            'Agama', 'Olahraga', 'Kuliner', 'Traveling', 'Bisnis',
        ];

        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
