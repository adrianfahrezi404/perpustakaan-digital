<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Fiksi', 'slug' => 'fiksi', 'icon' => '📚'],
            ['name' => 'Sains', 'slug' => 'sains', 'icon' => '🔬'],
            ['name' => 'Sejarah', 'slug' => 'sejarah', 'icon' => '🏛️'],
            ['name' => 'Biografi', 'slug' => 'biografi', 'icon' => '👤'],
            ['name' => 'Fiksi Ilmiah', 'slug' => 'fiksi-ilmiah', 'icon' => '🚀'],
            ['name' => 'Pengembangan Diri', 'slug' => 'pengembangan-diri', 'icon' => '💡'],
            ['name' => 'Fiksi Klasik', 'slug' => 'fiksi-klasik', 'icon' => '📖'],
            ['name' => 'Filsafat', 'slug' => 'filsafat', 'icon' => '🤔'],
            ['name' => 'Arsitektur', 'slug' => 'arsitektur', 'icon' => '🏗️'],
            ['name' => 'Desain', 'slug' => 'desain', 'icon' => '🎨'],
            ['name' => 'Lifestyle', 'slug' => 'lifestyle', 'icon' => '🌿'],
            ['name' => 'Psikologi', 'slug' => 'psikologi', 'icon' => '🧠'],
            ['name' => 'Sastra', 'slug' => 'sastra', 'icon' => '✍️'],
            ['name' => 'Self-Help', 'slug' => 'self-help', 'icon' => '💪'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
