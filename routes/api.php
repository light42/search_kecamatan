<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KecamatanController;

Route::get('/locations', [KecamatanController::class, 'search']);
