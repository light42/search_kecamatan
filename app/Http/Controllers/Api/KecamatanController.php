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
