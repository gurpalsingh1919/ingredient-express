<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::post('/paypal/checkout/', [OrderController::class, 'paypalCheckout']);
    Route::get('/orders', [OrderController::class, 'myOrders']);
    Route::get('/orders/{order}', [OrderController::class, 'orderDetails']); 
});
Route::get('/products/random', [ApiController::class, 'randomProducts']);

Route::get('/categories', [ApiController::class, 'categories']);
Route::get('/category/{id}', [ApiController::class, 'show']);
Route::get('/all-products', [ApiController::class, 'all_products']);
Route::post('/contact', [ApiController::class, 'store_contact']);
Route::get('/search-suggestions', [ApiController::class, 'searchSuggestions']);
Route::get('/subcategory/{id}/products', [ApiController::class, 'productsBySubcategory']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/products/{id}', [ApiController::class, 'show_product']);
