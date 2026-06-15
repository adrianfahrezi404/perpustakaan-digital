<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'library_name' => 'Perpustakaan Digital',
            'library_address' => 'Jl. Pendidikan No. 123, Jakarta',
            'contact_email' => 'info@perpustakaan.com',
            'max_books' => '5',
            'loan_duration' => '14',
            'fine_per_day' => '1000',
            'auto_backup_frequency' => 'daily',
        ];

        foreach ($settings as $key => $value) {
            Setting::create(['key' => $key, 'value' => $value]);
        }
    }
}
