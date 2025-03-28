<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Add a product to the cart.
     */
    public function addToCart(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = Auth::id(); // Get authenticated user ID
        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        // Check if the product is already in the cart
        $existingCartItem = Cart::where('product_id', $product->id)
                                ->where('user_id', $userId)
                                ->first();

        if ($existingCartItem) {
            $existingCartItem->quantity += $request->quantity;
            $existingCartItem->save();
            return response()->json(['message' => 'Product quantity updated in cart', 'cart' => $existingCartItem], 200);
        }

        // Create a new cart item
        $cart = Cart::create([
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'user_id' => $userId
        ]);

        return response()->json(['message' => 'Product added to cart', 'cart' => $cart], 200);
    }

    /**
     * Get the authenticated user's cart.
     */
    public function viewCart()
    {
        $userId = Auth::id(); // Get the logged-in user ID

        $cartItems = Cart::where('user_id', $userId)
            ->with('product')
            ->get();

        $subtotal = $cartItems->sum(fn($item) => $item->product->selling_price * $item->quantity);
        $tax = $subtotal * 0.05;
        $serviceFee = 42;
        $total = $subtotal + $tax + $serviceFee;

        return response()->json([
            'items' => $cartItems,
            'summary' => [
                'subtotal' => $subtotal,
                'tax' => $tax,
                'service' => $serviceFee,
                'total' => $total
            ]
        ]);
    }

    /**
     * Update cart item quantity.
     */
    public function updateCart(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Cart updated successfully']);
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem($id)
    {
        $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed']);
    }
}
