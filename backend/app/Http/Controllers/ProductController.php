<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Imports\ProductsImport;
use App\Models\ProductImage;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['images', 'categories'])->get();
        return view('admin.products.index', compact('products'));
    }



    public function create()
    {
        $applications = [
            '1' => 'Ingredients',
            '2' => 'Gluten Free',
            '3' => 'Organic Non-GMO'
        ];

        $categories = Category::whereNull('parent_id')->get();
        $subCategories = Category::whereNotNull('parent_id')->get();

        return view('admin.products.add', compact('applications', 'categories', 'subCategories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'vendor' => 'nullable|string|max:255',
            'application_id' => 'required|in:1,2,3',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
            'sub_categories' => 'nullable|array',
            'sub_categories.*' => 'exists:categories,id',
            'size' => 'nullable|string|max:100',
            'product_price' => 'nullable|numeric|min:0',
            'doubled_price' => 'nullable|numeric|min:0',
            'variant_inventory_qty' => 'nullable|integer|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $product = Product::create($request->only([
            'title',
            'vendor',
            'application_id',
            'size',
            'product_price',
            'doubled_price',
            'variant_inventory_qty'
        ]));


        $allCategories = array_merge(
            $request->input('categories', []),
            $request->input('sub_categories', [])
        );
        $product->categories()->sync($allCategories);


        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('img/products'), $imageName);

                $product->images()->create([
                    'image' => $imageName,
                ]);
            }
        }

        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }


    public function edit(Product $product)
    {
        $applications = [
            '1' => 'Ingredients',
            '2' => 'Gluten Free',
            '3' => 'Organic Non-GMO'
        ];


        $categories = Category::whereNull('parent_id')->get();
        $subCategories = Category::whereNotNull('parent_id')->get();

        return view('admin.products.edit', compact(
            'product',
            'applications',
            'categories',
            'subCategories'
        ));
    }



    public function update_product(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'vendor' => 'nullable|string|max:255',
            'application_id' => 'required|in:1,2,3',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
            'sub_categories' => 'nullable|array',
            'sub_categories.*' => 'exists:categories,id',
            'size' => 'nullable|string|max:100',
            'product_price' => 'nullable|numeric|min:0',
            'doubled_price' => 'nullable|numeric|min:0',
            'variant_inventory_qty' => 'nullable|integer|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update base product
        $product->update($request->only([
            'title',
            'vendor',
            'application_id',
            'size',
            'product_price',
            'doubled_price',
            'variant_inventory_qty'
        ]));

        // 🔹 Sync categories and subcategories in pivot table with is_subcategory flag
        $pivotData = [];

        // Main categories
        foreach ($request->input('categories', []) as $catId) {
            $pivotData[$catId] = ['is_subcategory' => false];
        }

        // Subcategories
        foreach ($request->input('sub_categories', []) as $subId) {
            $pivotData[$subId] = ['is_subcategory' => true];
        }

        $product->categories()->sync($pivotData);

        // Handle images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('img/products'), $imageName);

                $product->images()->create([
                    'image' => $imageName,
                ]);
            }
        }

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }





    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }

    public function import_products(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv,xls'
        ]);

        Excel::import(new ProductsImport, $request->file('file'));

        return redirect()->route('products.index')
            ->with('success', 'Import started! Products and images will be processed in background.');
    }

}
