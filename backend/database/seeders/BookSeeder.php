<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            ['title' => 'Laskar Pelangi', 'author' => 'Andrea Hirata', 'category' => 'Fiksi', 'year' => 2005, 'pages' => 529, 'cover' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 'synopsis' => 'Kisah inspiratif tentang 10 anak dari Belitung yang berjuang mengejar pendidikan di tengah keterbatasan.'],
            ['title' => 'Bumi Manusia', 'author' => 'Pramoedya Ananta Toer', 'category' => 'Sastra', 'year' => 1980, 'pages' => 535, 'cover' => 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400', 'synopsis' => 'Novel pertama dari Tetralogi Buru yang mengisahkan perjuangan Minke di era kolonial Belanda.'],
            ['title' => 'Filosofi Teras', 'author' => 'Henry Manampiring', 'category' => 'Filsafat', 'year' => 2018, 'pages' => 346, 'cover' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 'synopsis' => 'Pengantar filsafat Stoisisme untuk kehidupan modern yang lebih tenang dan bahagia.'],
            ['title' => 'Atomic Habits', 'author' => 'James Clear', 'category' => 'Self-Help', 'year' => 2018, 'pages' => 320, 'cover' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400', 'synopsis' => 'Cara mudah dan terbukti untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk.'],
            ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'category' => 'Sejarah', 'year' => 2011, 'pages' => 443, 'cover' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'synopsis' => 'Sejarah singkat umat manusia dari zaman purba hingga revolusi ilmiah.'],
            ['title' => 'Laut Bercerita', 'author' => 'Leila S. Chudori', 'category' => 'Fiksi', 'year' => 2017, 'pages' => 394, 'cover' => 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400', 'synopsis' => 'Novel tentang aktivis yang diculik dan perjuangan keluarga mereka mencari keadilan.'],
            ['title' => 'Cantik Itu Luka', 'author' => 'Eka Kurniawan', 'category' => 'Sastra', 'year' => 2002, 'pages' => 480, 'cover' => 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', 'synopsis' => 'Saga keluarga lintas generasi yang menggabungkan realisme magis dengan sejarah Indonesia.'],
            ['title' => 'Thinking, Fast and Slow', 'author' => 'Daniel Kahneman', 'category' => 'Psikologi', 'year' => 2011, 'pages' => 499, 'cover' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', 'synopsis' => 'Eksplorasi dua sistem berpikir yang mendorong cara kita membuat keputusan.'],
            ['title' => 'Dune', 'author' => 'Frank Herbert', 'category' => 'Fiksi Ilmiah', 'year' => 1965, 'pages' => 412, 'cover' => 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400', 'synopsis' => 'Epik fiksi ilmiah tentang politik, agama, dan ekologi di planet gurun Arrakis.'],
            ['title' => 'The Design of Everyday Things', 'author' => 'Don Norman', 'category' => 'Desain', 'year' => 1988, 'pages' => 347, 'cover' => 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', 'synopsis' => 'Panduan klasik tentang desain yang berpusat pada manusia dalam produk sehari-hari.'],
            ['title' => 'Sang Pemimpi', 'author' => 'Andrea Hirata', 'category' => 'Fiksi', 'year' => 2006, 'pages' => 292, 'cover' => 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400', 'synopsis' => 'Sekuel Laskar Pelangi tentang mimpi-mimpi besar tiga anak Melayu.'],
            ['title' => 'Perahu Kertas', 'author' => 'Dee Lestari', 'category' => 'Fiksi', 'year' => 2009, 'pages' => 444, 'cover' => 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400', 'synopsis' => 'Kisah cinta dan pencarian jati diri dua anak muda yang berbakat seni.'],
            ['title' => 'Sejarah Dunia yang Disembunyikan', 'author' => 'Jonathan Black', 'category' => 'Sejarah', 'year' => 2007, 'pages' => 560, 'cover' => 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400', 'synopsis' => 'Mengungkap sejarah tersembunyi dari perspektif perkumpulan rahasia.'],
            ['title' => 'Ikigai', 'author' => 'Héctor García & Francesc Miralles', 'category' => 'Pengembangan Diri', 'year' => 2016, 'pages' => 194, 'cover' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'synopsis' => 'Rahasia panjang umur dan kebahagiaan dari tradisi Jepang.'],
            ['title' => 'Negeri 5 Menara', 'author' => 'Ahmad Fuadi', 'category' => 'Fiksi', 'year' => 2009, 'pages' => 424, 'cover' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400', 'synopsis' => 'Kisah persahabatan dan mimpi di pesantren yang menginspirasi.'],
            ['title' => 'Homo Deus', 'author' => 'Yuval Noah Harari', 'category' => 'Sains', 'year' => 2015, 'pages' => 448, 'cover' => 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 'synopsis' => 'Masa depan umat manusia di era kecerdasan buatan dan bioteknologi.'],
            ['title' => 'Pulang', 'author' => 'Tere Liye', 'category' => 'Fiksi', 'year' => 2015, 'pages' => 400, 'cover' => 'https://images.unsplash.com/photo-1510172951991-856a62a9528e?w=400', 'synopsis' => 'Novel thriller tentang keluarga, pengkhianatan, dan pencarian jati diri.'],
            ['title' => 'Seni Berpikir Jernih', 'author' => 'Rolf Dobelli', 'category' => 'Psikologi', 'year' => 2011, 'pages' => 384, 'cover' => 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400', 'synopsis' => '52 kesalahan berpikir yang harus dihindari untuk keputusan yang lebih baik.'],
            ['title' => 'Rich Dad Poor Dad', 'author' => 'Robert Kiyosaki', 'category' => 'Pengembangan Diri', 'year' => 1997, 'pages' => 336, 'cover' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', 'synopsis' => 'Pelajaran tentang uang yang tidak diajarkan di sekolah.'],
            ['title' => 'Ronggeng Dukuh Paruk', 'author' => 'Ahmad Tohari', 'category' => 'Fiksi Klasik', 'year' => 1982, 'pages' => 408, 'cover' => 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400', 'synopsis' => 'Trilogi klasik tentang kehidupan masyarakat pedesaan Jawa dan tradisi ronggeng.'],
            ['title' => 'The Subtle Art of Not Giving a F*ck', 'author' => 'Mark Manson', 'category' => 'Self-Help', 'year' => 2016, 'pages' => 224, 'cover' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 'synopsis' => 'Pendekatan kontra-intuitif untuk menjalani kehidupan yang baik.'],
            ['title' => 'Arah Langkah', 'author' => 'Fiersa Besari', 'category' => 'Fiksi', 'year' => 2018, 'pages' => 260, 'cover' => 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400', 'synopsis' => 'Novel perjalanan tentang pencarian makna hidup melintasi Indonesia.'],
            ['title' => 'Dunia Sophie', 'author' => 'Jostein Gaarder', 'category' => 'Filsafat', 'year' => 1991, 'pages' => 513, 'cover' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 'synopsis' => 'Novel yang mengajarkan sejarah filsafat melalui petualangan seorang gadis Norwegia.'],
            ['title' => '1984', 'author' => 'George Orwell', 'category' => 'Fiksi Klasik', 'year' => 1949, 'pages' => 328, 'cover' => 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400', 'synopsis' => 'Novel distopia tentang pengawasan pemerintah totaliter dan manipulasi kebenaran.'],
            ['title' => 'Brief Answers to the Big Questions', 'author' => 'Stephen Hawking', 'category' => 'Sains', 'year' => 2018, 'pages' => 256, 'cover' => 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400', 'synopsis' => 'Jawaban Stephen Hawking atas pertanyaan-pertanyaan besar tentang alam semesta.'],
            ['title' => 'Mindset', 'author' => 'Carol S. Dweck', 'category' => 'Psikologi', 'year' => 2006, 'pages' => 276, 'cover' => 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400', 'synopsis' => 'Kekuatan pola pikir bertumbuh dalam mencapai kesuksesan.'],
            ['title' => 'Supernova', 'author' => 'Dee Lestari', 'category' => 'Fiksi Ilmiah', 'year' => 2001, 'pages' => 191, 'cover' => 'https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=400', 'synopsis' => 'Novel fiksi ilmiah Indonesia tentang cinta, sains, dan spiritualitas.'],
            ['title' => 'The Psychology of Money', 'author' => 'Morgan Housel', 'category' => 'Pengembangan Diri', 'year' => 2020, 'pages' => 256, 'cover' => 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=400', 'synopsis' => 'Pelajaran abadi tentang kekayaan, keserakahan, dan kebahagiaan.'],
            ['title' => 'Ayah', 'author' => 'Andrea Hirata', 'category' => 'Fiksi', 'year' => 2015, 'pages' => 400, 'cover' => 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400', 'synopsis' => 'Kisah cinta yang mengatasi waktu dan jarak dari penulis Laskar Pelangi.'],
            ['title' => 'Steve Jobs', 'author' => 'Walter Isaacson', 'category' => 'Biografi', 'year' => 2011, 'pages' => 656, 'cover' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', 'synopsis' => 'Biografi resmi pendiri Apple yang visioner dan kontroversial.'],
            ['title' => 'Habibie & Ainun', 'author' => 'B.J. Habibie', 'category' => 'Biografi', 'year' => 2010, 'pages' => 321, 'cover' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 'synopsis' => 'Kisah cinta sejati presiden ke-3 Indonesia dengan istrinya.'],
            ['title' => 'Matahari', 'author' => 'Tere Liye', 'category' => 'Fiksi Ilmiah', 'year' => 2019, 'pages' => 400, 'cover' => 'https://images.unsplash.com/photo-1507499739999-097706ad8914?w=400', 'synopsis' => 'Petualangan fantasi ilmiah dalam seri Bumi karya Tere Liye.'],
            ['title' => 'Educated', 'author' => 'Tara Westover', 'category' => 'Biografi', 'year' => 2018, 'pages' => 334, 'cover' => 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400', 'synopsis' => 'Memoar seorang wanita yang tumbuh di keluarga survivalis dan meraih PhD dari Cambridge.'],
            ['title' => 'Originals', 'author' => 'Adam Grant', 'category' => 'Pengembangan Diri', 'year' => 2016, 'pages' => 336, 'cover' => 'https://images.unsplash.com/photo-1549122728-f519709caa9c?w=400', 'synopsis' => 'Bagaimana non-konformis menggerakkan dunia.'],
            ['title' => 'Animal Farm', 'author' => 'George Orwell', 'category' => 'Fiksi Klasik', 'year' => 1945, 'pages' => 141, 'cover' => 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400', 'synopsis' => 'Alegori politik tentang revolusi dan kekuasaan yang korup.'],
            ['title' => 'Quiet', 'author' => 'Susan Cain', 'category' => 'Psikologi', 'year' => 2012, 'pages' => 352, 'cover' => 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400', 'synopsis' => 'Kekuatan introvert di dunia yang tidak bisa berhenti berbicara.'],
            ['title' => 'A Brief History of Time', 'author' => 'Stephen Hawking', 'category' => 'Sains', 'year' => 1988, 'pages' => 256, 'cover' => 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400', 'synopsis' => 'Pengantar kosmologi populer dari fisikawan paling terkenal di dunia.'],
            ['title' => 'Bintang', 'author' => 'Tere Liye', 'category' => 'Fiksi Ilmiah', 'year' => 2017, 'pages' => 400, 'cover' => 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400', 'synopsis' => 'Kelanjutan petualangan Raib, Seli, dan Ali di dunia paralel.'],
            ['title' => 'Zero to One', 'author' => 'Peter Thiel', 'category' => 'Pengembangan Diri', 'year' => 2014, 'pages' => 224, 'cover' => 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', 'synopsis' => 'Catatan tentang startup dan cara membangun masa depan.'],
            ['title' => 'Tenggelamnya Kapal Van Der Wijck', 'author' => 'Hamka', 'category' => 'Fiksi Klasik', 'year' => 1939, 'pages' => 235, 'cover' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 'synopsis' => 'Roman klasik tentang cinta yang terhalang adat dan budaya Minangkabau.'],
            ['title' => 'Deep Work', 'author' => 'Cal Newport', 'category' => 'Self-Help', 'year' => 2016, 'pages' => 296, 'cover' => 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400', 'synopsis' => 'Aturan untuk fokus di dunia yang penuh distraksi.'],
            ['title' => 'The Art of War', 'author' => 'Sun Tzu', 'category' => 'Filsafat', 'year' => -500, 'pages' => 128, 'cover' => 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400', 'synopsis' => 'Strategi militer kuno yang masih relevan untuk bisnis dan kehidupan modern.'],
            ['title' => 'Dari Anak Kolong ke Istana', 'author' => 'Muhammadiyah', 'category' => 'Biografi', 'year' => 2020, 'pages' => 280, 'cover' => 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400', 'synopsis' => 'Kisah inspiratif perjalanan hidup dari keterbatasan menuju kesuksesan.'],
            ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'category' => 'Sains', 'year' => 1980, 'pages' => 396, 'cover' => 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400', 'synopsis' => 'Perjalanan mengagumkan menjelajahi alam semesta dan tempat kita di dalamnya.'],
            ['title' => 'Hujan', 'author' => 'Tere Liye', 'category' => 'Fiksi', 'year' => 2016, 'pages' => 320, 'cover' => 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400', 'synopsis' => 'Novel futuristik tentang cinta dan memori di dunia pasca-bencana.'],
            ['title' => 'The Lean Startup', 'author' => 'Eric Ries', 'category' => 'Pengembangan Diri', 'year' => 2011, 'pages' => 336, 'cover' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', 'synopsis' => 'Bagaimana entrepreneur modern menggunakan inovasi untuk membangun bisnis yang sukses.'],
            ['title' => 'Kafka on the Shore', 'author' => 'Haruki Murakami', 'category' => 'Fiksi', 'year' => 2002, 'pages' => 480, 'cover' => 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400', 'synopsis' => 'Novel surealis Murakami tentang seorang remaja pelarian dan pria tua yang bisa berbicara dengan kucing.'],
            ['title' => 'Grit', 'author' => 'Angela Duckworth', 'category' => 'Self-Help', 'year' => 2016, 'pages' => 352, 'cover' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400', 'synopsis' => 'Kekuatan passion dan ketekunan dalam meraih tujuan jangka panjang.'],
            ['title' => 'Meditations', 'author' => 'Marcus Aurelius', 'category' => 'Filsafat', 'year' => 180, 'pages' => 256, 'cover' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 'synopsis' => 'Catatan pribadi kaisar Romawi tentang kebijaksanaan Stoik.'],
            ['title' => 'Norwegian Wood', 'author' => 'Haruki Murakami', 'category' => 'Fiksi', 'year' => 1987, 'pages' => 389, 'cover' => 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400', 'synopsis' => 'Novel realistis Murakami tentang cinta, kehilangan, dan seksualitas di Tokyo tahun 1960-an.'],
        ];

        $tags = Tag::all();

        foreach ($books as $bookData) {
            $category = Category::where('name', $bookData['category'])->first();

            $book = Book::create([
                'title' => $bookData['title'],
                'author' => $bookData['author'],
                'isbn' => fake()->unique()->isbn13(),
                'synopsis' => $bookData['synopsis'],
                'category_id' => $category->id,
                'cover' => $bookData['cover'],
                'type' => fake()->randomElement(['fisik', 'digital']),
                'stock' => fake()->numberBetween(1, 15),
                'pages' => $bookData['pages'],
                'publish_year' => $bookData['year'] > 0 ? $bookData['year'] : null,
                'publisher' => fake()->company(),
                'price' => fake()->numberBetween(35, 120) * 1000,
                'rating' => fake()->randomFloat(2, 3.5, 5.0),
                'reviews_count' => fake()->numberBetween(5, 150),
                'status' => 'tersedia',
            ]);

            // Attach 2-3 random tags
            $book->tags()->attach($tags->random(fake()->numberBetween(2, 3))->pluck('id'));
        }
    }
}
