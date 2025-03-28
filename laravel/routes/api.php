<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\CheckoutController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::middleware(['auth:sanctum','isAPIAdmin'])->get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are authenticated', 'status' => 200], 200);
    });

    // Cart Endpoints
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'viewCart']);
    Route::put('/cart/update/{id}', [CartController::class, 'updateCart']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeItem']);
        
    // Pincode Validation
    Route::get('/pincodes', [PincodeController::class, 'getAvailablePincodes']);
    
    //Category
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy'])
    ->name('category.destroy');
    Route::get('all-category', [CategoryController::class, 'allcategory']);

    // Products
    Route::post('store-product', [ProductController::class, 'store'])->name('products.store');
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::put('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
    // Fetch a single product
    Route::get('/product/{id}', [ProductController::class, 'viewProduct']);


    // carousels
    Route::post('/store-carousel', [CarouselController::class, 'store']);
    Route::get('/carousels', [CarouselController::class, 'index']);

    // Checkout
    Route::middleware(['auth:sanctum'])->post('/place-order', [CheckoutController::class, 'store']);
    Route::post('/place-order', [CheckoutController::class, 'placeOrder']);
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
