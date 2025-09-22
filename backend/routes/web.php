<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DiscountController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/admin/register', [AdminAuthController::class, 'showRegister'])->name('admin.register');
Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');


Route::group(['middleware' => ['auth', 'admin']], function () {
    Route::get('/admin/contact-requests', [AdminController::class, 'all_req'])->name('admin.allreq');
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/profile', [AdminController::class, 'profile'])->name('admin.profile');
    Route::post('/admin/profile', [AdminController::class, 'updateProfile'])->name('admin.updateProfile');
    Route::get('/admin/change-password', [AdminController::class, 'uppassword'])->name('admin.uppassword');
    Route::post('/admin/change-password', [AdminController::class, 'changePassword'])->name('admin.changePassword');

    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/admin/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/admin/categories/store', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/admin/categories/edit/{id}', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('/admin/categories/update/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::post('/admin/categories/delete/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/admin/categories/get-subcategories/{categoryId}', [CategoryController::class, 'getChildren'])->name('categories.children');
    Route::get('/admin/categories/get-by-application/{id}', [CategoryController::class, 'getByApplication'])->name('categories.getByApplication');



    Route::get('/admin/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
    // Route::get('/admin/products/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/admin/products/{product}/update', [ProductController::class, 'update_product'])->name('products.up');
    Route::post('/admin/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::post('/admin/import', [ProductController::class, 'import_products'])->name('product.import');





    Route::get('/admin/create-discount', [DiscountController::class, 'create'])->name('discount.create');

});