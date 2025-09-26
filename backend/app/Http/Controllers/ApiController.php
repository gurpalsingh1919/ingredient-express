<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactReceived;
use App\Mail\ContactAdminNotification;
class ApiController extends Controller
{
    public function categories()
    {
        try {

            $p_cat = Category::whereNull('parent_id')->get();

            return response()->json([
                'status' => true,
                'message' => 'Categories fetched successfully',
                'data' => $p_cat
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        $category = Category::findOrFail($id);
        $subcategories = Category::where('parent_id', $id)->get();

        return response()->json([
            'status' => true,
            'category' => $category,
            'subcategories' => $subcategories
        ]);
    }

    public function all_products()
    {
        $products = Product::with('images')->get();

        return response()->json([
            'status' => true,
            'products' => $products ?? [],
        ]);
    }




    public function searchSuggestions(Request $request)
    {
        $query = $request->input('q');
        $products = Product::with('images')
            ->where('title', 'like', "%{$query}%")
            ->limit(10)
            ->get();

        return response()->json(['status' => true, 'products' => $products]);
    }



    public function store_contact(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        // Save contact
        $contact = Contact::create($validated);

        // Send confirmation email to user
        Mail::to($validated['email'])->send(new ContactReceived($contact));

        // Send notification to admin
        Mail::to('piyushthakur@jwhglobal.com')->send(new ContactAdminNotification($contact));

        return response()->json([
            'status' => true,
            'message' => 'Contact submitted successfully!'
        ]);
    }

    public function show_product($id)
    {
        $product = Product::with('images')->find($id);

        if (!$product) {
            return response()->json(['status' => false, 'message' => 'Not Found'], 404);
        }

        $sizes = [];
        if (!empty($product->size)) {
            $sizes = explode(',', $product->size);
            $sizes = array_map('trim', $sizes);
        }

        return response()->json([
            'status' => true,
            'product' => $product,
            'sizes' => $sizes
        ]);
    }


    public function productsBySubcategory($id)
    {
        $subcategory = Category::find($id);

        if (!$subcategory) {
            return response()->json([
                'status' => false,
                'message' => 'Subcategory not found',
            ], 404);
        }

        // get products with images (important)
        $products = $subcategory->products()
            ->wherePivot('is_subcategory', true)
            ->with('images')
            ->get();

        return response()->json([
            'status' => true,
            'subcategory' => [
                'id' => $subcategory->id,
                'name' => $subcategory->name,
            ],
            'products' => $products,
        ]);
    }

    public function randomProducts()
    {
        $products = Product::with('images')->inRandomOrder()->limit(4)->get();
        return response()->json($products);
    }



}
