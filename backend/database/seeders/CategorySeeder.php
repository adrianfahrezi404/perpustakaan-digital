<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Add a huge list of categories suitable for a large library
        $categories = [
            // Komputer & Teknologi
            ['name' => 'Teknologi Informasi', 'slug' => 'teknologi-informasi', 'icon' => '💻'],
            ['name' => 'Pemrograman & Software', 'slug' => 'pemrograman', 'icon' => '⌨️'],
            ['name' => 'Kecerdasan Buatan', 'slug' => 'kecerdasan-buatan', 'icon' => '🤖'],
            ['name' => 'Jaringan & Infrastruktur', 'slug' => 'jaringan-komputer', 'icon' => '🌐'],
            ['name' => 'Database & Big Data', 'slug' => 'database', 'icon' => '🗄️'],
            ['name' => 'Keamanan Siber', 'slug' => 'keamanan-siber', 'icon' => '🔒'],
            ['name' => 'Desain Web', 'slug' => 'desain-web', 'icon' => '🕸️'],
            ['name' => 'Sistem Operasi', 'slug' => 'sistem-operasi', 'icon' => '🖥️'],
            
            // Fiksi & Sastra
            ['name' => 'Fiksi Umum', 'slug' => 'fiksi', 'icon' => '📚'],
            ['name' => 'Fiksi Ilmiah (Sci-Fi)', 'slug' => 'fiksi-ilmiah', 'icon' => '🚀'],
            ['name' => 'Fantasi', 'slug' => 'fantasi', 'icon' => '🧝'],
            ['name' => 'Misteri & Thriller', 'slug' => 'misteri-thriller', 'icon' => '🕵️'],
            ['name' => 'Romansa', 'slug' => 'romansa', 'icon' => '❤️'],
            ['name' => 'Horor', 'slug' => 'horor', 'icon' => '👻'],
            ['name' => 'Puisi & Sastra', 'slug' => 'puisi-sastra', 'icon' => '✒️'],
            ['name' => 'Novel Grafis & Komik', 'slug' => 'komik', 'icon' => '🗯️'],
            
            // Ilmu Pengetahuan & Pendidikan
            ['name' => 'Sains & Alam', 'slug' => 'sains', 'icon' => '🔬'],
            ['name' => 'Matematika', 'slug' => 'matematika', 'icon' => '➗'],
            ['name' => 'Fisika & Kimia', 'slug' => 'fisika-kimia', 'icon' => '🧪'],
            ['name' => 'Biologi & Kedokteran', 'slug' => 'biologi', 'icon' => '🧬'],
            ['name' => 'Sejarah & Peradaban', 'slug' => 'sejarah', 'icon' => '🏛️'],
            ['name' => 'Geografi & Lingkungan', 'slug' => 'geografi', 'icon' => '🌍'],
            ['name' => 'Buku Pelajaran & Edukasi', 'slug' => 'pendidikan', 'icon' => '🎒'],
            
            // Sosial, Humaniora & Agama
            ['name' => 'Filsafat', 'slug' => 'filsafat', 'icon' => '🤔'],
            ['name' => 'Psikologi', 'slug' => 'psikologi', 'icon' => '🧠'],
            ['name' => 'Sosiologi & Budaya', 'slug' => 'sosiologi', 'icon' => '👥'],
            ['name' => 'Agama & Kepercayaan', 'slug' => 'agama', 'icon' => '🕌'],
            ['name' => 'Hukum & Kriminalistik', 'slug' => 'hukum', 'icon' => '⚖️'],
            ['name' => 'Politik & Pemerintahan', 'slug' => 'politik', 'icon' => '🗳️'],
            
            // Bisnis & Pengembangan Diri
            ['name' => 'Bisnis & Manajemen', 'slug' => 'bisnis-manajemen', 'icon' => '📈'],
            ['name' => 'Ekonomi & Keuangan', 'slug' => 'ekonomi', 'icon' => '💰'],
            ['name' => 'Pemasaran & Penjualan', 'slug' => 'pemasaran', 'icon' => '🎯'],
            ['name' => 'Pengembangan Diri', 'slug' => 'pengembangan-diri', 'icon' => '💡'],
            ['name' => 'Kepemimpinan', 'slug' => 'kepemimpinan', 'icon' => '👑'],
            ['name' => 'Motivasi & Inspirasi', 'slug' => 'motivasi', 'icon' => '🔥'],
            
            // Seni, Gaya Hidup & Hiburan
            ['name' => 'Seni & Desain', 'slug' => 'seni-desain', 'icon' => '🎨'],
            ['name' => 'Fotografi & Sinematografi', 'slug' => 'fotografi', 'icon' => '📷'],
            ['name' => 'Musik & Pertunjukan', 'slug' => 'musik', 'icon' => '🎵'],
            ['name' => 'Kesehatan & Kebugaran', 'slug' => 'kesehatan', 'icon' => '⚕️'],
            ['name' => 'Kuliner & Resep Makanan', 'slug' => 'kuliner', 'icon' => '🍳'],
            ['name' => 'Olahraga', 'slug' => 'olahraga', 'icon' => '⚽'],
            ['name' => 'Travel & Pariwisata', 'slug' => 'travel', 'icon' => '✈️'],
            ['name' => 'Biografi & Memoar', 'slug' => 'biografi', 'icon' => '👤'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
