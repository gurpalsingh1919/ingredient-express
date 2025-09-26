<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;

class OrderController extends Controller
{
    public function paypalCheckout(Request $request)
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $subtotal = $cartItems->sum(fn($item) => $item->product->doubled_price * $item->quantity);

        $paypalOrder = $request->paypal_order;

        // Extract payment ID
        $paymentId = $paypalOrder['purchase_units'][0]['payments']['captures'][0]['id'] ?? null;

        // Extract shipping address
        $shipping = $paypalOrder['purchase_units'][0]['shipping']['address'] ?? null;
        $shipping_address = $shipping ? json_encode([
            'line1' => $shipping['address_line_1'] ?? '',
            'line2' => $shipping['address_line_2'] ?? '',
            'city' => $shipping['admin_area_2'] ?? '',
            'state' => $shipping['admin_area_1'] ?? '',
            'postal_code' => $shipping['postal_code'] ?? '',
            'country_code' => $shipping['country_code'] ?? '',
        ]) : null;

        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'subtotal' => $subtotal,
            'payment_status' => 'completed',
            'payment_id' => $paymentId,
            'shipping_address' => $shipping_address
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->doubled_price
            ]);
        }

        // Clear cart
        CartItem::where('user_id', $user->id)->delete();

        // Send confirmation email
         Mail::to($user->email)->send(new OrderConfirmation($order));

        return response()->json(['message' => 'Order completed successfully']);
    }

    public function all_orders(Request $request)
    {

        $orders = Order::with(['user', 'orderItems.product'])
            ->orderBy('created_at', 'desc')
            ->get();

        return view('admin.all-orders', compact('orders'));
    }

    public function myOrders(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
                'orders' => []
            ], 401);
        }

        $orders = Order::with(['orderItems.product'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'debug_user_id' => $user->id,
            'orders_count' => $orders->count(),
            'orders' => $orders
        ]);
    }




    public function orderDetails(Order $order, Request $request)
    {
        $user = Auth::user();


        if ($order->user_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $order->load('orderItems.product');

        return response()->json([
            'success' => true,
            'order' => $order
        ]);
    }



}