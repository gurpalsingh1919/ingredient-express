<?php
// app/Http/Controllers/API/CartController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        
        $cartItems = CartItem::with(['product.images'])
            ->where('user_id', $user->id)
            ->get();

        $count = $cartItems->sum('quantity');

        return response()->json([
            'items' => $cartItems,
            'count' => $count
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $user = Auth::user();

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity ?? 1;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity ?? 1,
            ]);
        }

        return response()->json(['message' => 'Product added to cart successfully']);
    }

    public function remove($id)
    {
        $user = Auth::user();
        $cartItem = CartItem::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed successfully']);
    }

    public function clear()
    {
        $user = Auth::user();
        CartItem::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Cart cleared successfully']);
    }
}