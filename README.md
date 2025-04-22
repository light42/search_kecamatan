# prerequisite
1. Laravel 11+
2. PHP 8.2
3. npm
4. php-sqlite3

# Setup
## Back-end
## 1. Install Laravel installer CLI tool

```
composer global require laravel/installer
```
## 2. Buat repo laravel
```
laravel new search_kecamatan
```
Pilih react starter kit, built-in auth, Pest, run npm install dan npm run build.
### 2.1 Test backend
Pertama, jalankan perintah ini:
```
php artisan migrate
```
Setelah itu, hidupkan server dengan perintah ini:
```
composer run dev
```

## 3. Buat Model Kecamatan
```
php artisan make:model Kecamatan -m
```
## 4. Siapkan properti model Kecamatan
buka file `app/Models/Kecamatan.php`, tambahkan attribute $fillable untuk column data yang akan diisi.
```php
<?php  
  
namespace App\Models;  
  
use Illuminate\Database\Eloquent\Factories\HasFactory;  
use Illuminate\Database\Eloquent\Model;  
  
class Kecamatan extends Model  
{  
    use HasFactory;  
   
    protected $fillable = [  
        'kecamatan',  
        'kota',  
        'provinsi',  
    ];  
}
```
buka `database/migrations/xxxx_xx_xx_xxxxxx_create_kecamatans_table.php`, lalu isi file dengan method `up` dan `down`

```php
<?php  
  
use Illuminate\Database\Migrations\Migration;  
use Illuminate\Database\Schema\Blueprint;  
use Illuminate\Support\Facades\Schema;  
  
return new class extends Migration  
{   
    public function up(): void  
    {  
        Schema::create('kecamatans', function (Blueprint $table) {  
            $table->id();  
            $table->string('kecamatan'); 
            $table->string('kota');      
            $table->string('provinsi');  
            $table->timestamps();  
        });  
    }  
  
    public function down(): void  
    {  
        Schema::dropIfExists('kecamatans');  
    }  
};  
```
Run lagi `migrate` untuk menambah model Kecamatan ke sqlite.

## 5. Buat seeder untuk model Kecamatan
Supaya database tidak kosong saat kita coba kueri, kita bisa menambahkan beberapa dataset `Kecamatan` menggunakan Seeder.

buka `database/seeders/KecamatanSeeder.php`, isi dengan sample data yang diinginkan.

```php
<?php  
  
namespace Database\Seeders;  
  
use Illuminate\Database\Console\Seeds\WithoutModelEvents;  
use Illuminate\Database\Seeder;  
use App\Models\Kecamatan; 
use Illuminate\Support\Facades\DB;
  
class KecamatanSeeder extends Seeder  
{  
    public function run(): void  
    {  
        DB::table('kecamatans')->truncate();
        $jakartaDistricts = [ 
        // Jakarta Pusat
        ['kecamatan' => 'Gambir', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'],
        ['kecamatan' => 'Sawah Besar', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'],
        ['kecamatan' => 'Kemayoran', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'],
        ['kecamatan' => 'Senen', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'],
        ['kecamatan' => 'Cempaka Putih', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Menteng', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Tanah Abang', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Johar Baru', 'kota' => 'Jakarta Pusat', 'provinsi' => 'DKI Jakarta'], 
        // Jakarta Utara
        ['kecamatan' => 'Cilincing', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Koja', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kelapa Gading', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Tanjung Priok', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pademangan', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Penjaringan', 'kota' => 'Jakarta Utara', 'provinsi' => 'DKI Jakarta'],
        //Jakarta Timur
        ['kecamatan' => 'Matraman', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pulogadung', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Jatinegara', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Duren Sawit', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kramat Jati', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Makasar', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pasar Rebo', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Ciracas', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Cipayung', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Cakung', 'kota' => 'Jakarta Timur', 'provinsi' => 'DKI Jakarta'],
        // Jakarta Selatan
        ['kecamatan' => 'Kebayoran Baru', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kebayoran Lama', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pesanggrahan', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Cilandak', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pasar Minggu', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Jagakarsa', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Mampang Prapatan', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Pancoran', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Tebet', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Setiabudi', 'kota' => 'Jakarta Selatan', 'provinsi' => 'DKI Jakarta'],
        // Jakarta Barat
        ['kecamatan' => 'Cengkareng', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Grogol Petamburan', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kalideres', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kebon Jeruk', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kembangan', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Palmerah', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Taman Sari', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Tambora', 'kota' => 'Jakarta Barat', 'provinsi' => 'DKI Jakarta'],
        // Kepulauan Seribu
        ['kecamatan' => 'Kepulauan Seribu Utara', 'kota' => 'Kepulauan Seribu', 'provinsi' => 'DKI Jakarta'], 
        ['kecamatan' => 'Kepulauan Seribu Selatan', 'kota' => 'Kepulauan Seribu', 'provinsi' => 'DKI Jakarta']]; 
        // Insert data 
        foreach ($jakartaDistricts as $kecamatan) {Kecamatan::create($kecamatan); }}  
}  
```

update `database/seeders/DatabaseSeeder.php` supaya dia juga memanggil KecamatanSeeder

```php
<?php  
  
namespace Database\Seeders;  
  
use Illuminate\Database\Seeder;  
  
class DatabaseSeeder extends Seeder  
{  

    public function run(): void  
    {  
        $this->call([  
            KecamatanSeeder::class, //tambahkan line ini
        ]);  
    }  
}**
```

Setelah itu run:
```
php artisan db:seed
```

## 6. Buat controller untuk model Kecamatan

Bagian ini untuk menghandle logic dari api yang akan kita buat.

Pertama, tama buat controllernya dengan composer:

```
php artisan make:controller Api/KecamatanController --api
```

Buka file `app/Http/Controllers/Api/KecamatanController.php` dan buat method search untuk data kecamatan:

```php
<?php  
  
namespace App\Http\Controllers\Api;  
  
use App\Http\Controllers\Controller;  
use Illuminate\Http\Request;  
use App\Models\Kecamatan;  
  
class KecamatanController extends Controller  
{  
    public function search(Request $request)  
    {  
        $search = $request->input('search', '');  
  
        $query = Kecamatan::query();  
  
        if (!empty($search)) {  
            $query->where(function ($q) use ($search) {  
                $q->where('kecamatan', 'LIKE', "%{$search}%")  
                  ->orWhere('kota', 'LIKE', "%{$search}%")  
                  ->orWhere('provinsi', 'LIKE', "%{$search}%");  
            });  
        }  
  
        $kecamatans = $query->get();  
    
        return response()->json($kecamatans);  
    }  
  
}  
```

## 7. Buat rute api untuk search
Enable rute api menggunakan composer

```
php artisan install:api
```

Buka `routes/api.php` dan buat rutenya sesuai spesifikasi:

```php
<?php  
  
use Illuminate\Http\Request;  
use Illuminate\Support\Facades\Route;  
use App\Http\Controllers\Api\KecamatanController;  
  
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {  
    return $request->user();  
});  
    
Route::get('/locations', [KecamatanController::class, 'search']);  
```

buka `routes/web.php`, tambahkan rute yang sama:

```
<?php  
  
use Illuminate\Support\Facades\Route;  
use Inertia\Inertia;
  
Route::get('/', function () {  
    return Inertia::render('KecamatanSearch');  
})->name('kecamatan.search');
```
Hal ini untuk membuat rute untuk react pagenya.

Bagian backend sudah beres.

## 8. Buat tipe data Kecamatan untuk React

buka `resources/js/types/index.d.ts`, masukkan ini
```typescript
export type Kecamatan = {  
    id: number;  
    kecamatan: string;  
    kota: string;  
    provinsi: string;  
};
```

## 9. Buat react page untuk fitur search

buka `resources/js/pages/KecamatanSearch.tsx`, masukkan ini:

```typescript
import React, { useState, useEffect, useCallback } from 'react';  
import axios from 'axios';  
import { Kecamatan } from '@/types';  
import { Head } from '@inertiajs/react';  
  
 
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {  
    let timeoutId: ReturnType<typeof setTimeout> | null = null;  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>  
        new Promise((resolve) => {  
            if (timeoutId) { clearTimeout(timeoutId); }  
            timeoutId = setTimeout(() => { resolve(func(...args)); }, waitFor);  
        });  
}  
  
export default function KecamatanSearch() {  
    const [searchQuery, setSearchQuery] = useState('');  
    const [results, setResults] = useState<Kecamatan[]>([]);  
    const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(null);  
    const [isLoading, setIsLoading] = useState(false);  
    const [showDropdown, setShowDropdown] = useState(false);  
   
    const fetchKecamatans = useCallback(  
        debounce(async (query: string) => {  
            if (query.trim() === '') {  
                setResults([]);  
                setShowDropdown(false);  
                setIsLoading(false);  
                return;  
            }  
            setIsLoading(true);  
            try {  
                const response = await axios.get<Kecamatan[]>('/api/locations', {  
                    params: { search: query },  
                });  
                setResults(response.data);  
                setShowDropdown(response.data.length > 0); 
            } catch (error) {  
                console.error('Error fetching kecamatan data:', error);  
                setResults([]);  
                setShowDropdown(false);  
            } finally {  
                setIsLoading(false);  
            }  
        }, 300),  
        []  
    );  
  
 
    useEffect(() => {  
        fetchKecamatans(searchQuery);  
    }, [searchQuery, fetchKecamatans]);  
  
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        const query = event.target.value;  
        setSearchQuery(query);  
        setSelectedKecamatan(null);  
        if (!query.trim()) {  
            setShowDropdown(false);  
        } else {  
            fetchKecamatans(query);  
        }  
    };  
  
    const handleSelectKecamatan = (kecamatan: Kecamatan) => {  
        setSelectedKecamatan(kecamatan);  
        setSearchQuery(`${kecamatan.kecamatan}, ${kecamatan.kota}`);  
        setResults([]);  
        setShowDropdown(false);  
    };  
  
 
    useEffect(() => {  
        const handleClickOutside = (event: MouseEvent) => {   
            const container = document.getElementById('search-container');  
            if (container && !container.contains(event.target as Node)) {  
                setShowDropdown(false);  
            }  
        };  
  
        if (showDropdown) {  
            document.addEventListener('mousedown', handleClickOutside);  
        } else {  
 
            document.removeEventListener('mousedown', handleClickOutside);  
        }  
  
        return () => {  
            document.removeEventListener('mousedown', handleClickOutside);  
        };  
    }, [showDropdown]); 
  
    return (  
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">  
            <Head title="Kecamatan Search" />  
  
            <header className="bg-white dark:bg-gray-800 shadow">  
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">  
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">  
                        Kecamatan Search  
                    </h2>  
                </div>  
            </header>  
  
            <main>  
                <div className="py-12">  
                    <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">  
                         
                        <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">  
                            <div className="p-6 text-gray-900 dark:text-gray-100">  
                                
                                <div id="search-container" className="relative mb-4">  
                                    <label htmlFor="search-kecamatan" className="block text-sm font-medium mb-1">  
                                        Search Kecamatan, Kota, atau Provinsi  
                                    </label>  
                                    <input  
                                        type="text"  
                                        id="search-kecamatan"  
                                        value={searchQuery}  
                                        onChange={handleInputChange}  
                                        onFocus={() => searchQuery.trim() && results.length > 0 && setShowDropdown(true)}  
                                        placeholder="contoh: Menteng, Jakarta Pusat, DKI Jakarta"  
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"  
                                        autoComplete="off"  
                                    />  
                                    {isLoading && <div className="absolute right-3 top-9 text-sm text-gray-500">Loading...</div>}  
  
                                    {showDropdown && results.length > 0 && (  
                                        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">  
                                            {results.map((kec) => (  
                                                <li  
                                                    key={kec.id}  
                                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"  
                                                    onMouseDown={() => handleSelectKecamatan(kec)} // Use onMouseDown  
                                                >  
                                                    {kec.kecamatan}, {kec.kota}, {kec.provinsi}  
                                                </li>  
                                            ))}  
                                        </ul>  
                                    )}  
                                    {showDropdown && results.length === 0 && searchQuery.trim() && !isLoading && (  
                                        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-4 text-center text-gray-500">  
                                            No results found.  
                                        </div>  
                                    )}  
                                </div>  
  
                                {selectedKecamatan && (  
                                    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900">  
                                        <h3 className="text-lg font-semibold mb-2">Selected Location Details:</h3>  
                                        <p><strong>ID:</strong> {selectedKecamatan.id}</p>  
                                        <p><strong>Kecamatan:</strong> {selectedKecamatan.kecamatan}</p>  
                                        <p><strong>Kota/Kabupaten:</strong> {selectedKecamatan.kota}</p>  
                                        <p><strong>Provinsi:</strong> {selectedKecamatan.provinsi}</p>  
                                    </div>  
                                )}  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </main>  
        </div>
    );  
}  
```

## 10. Testing
Pastikan isi `vite.config.ts` seperti ini

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx', 'resources/js/pages/KecamatanSearch.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
```

dan `bootstrap/app.php` seperti ini:

```
<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

Jalankan
```
npm run build
```


```
php artisan serve
```

untuk mencobanya.
