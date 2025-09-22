<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::with('parent')->get();
        return view('admin.categories.index', compact('categories'));
    }

    public function create()
    {
        $applications = [
            '1' => 'Ingredients',
            '2' => 'Gluten Free',
            '3' => 'Organic Non-GMO'
        ];
        $mainCategories = Category::whereNull('parent_id')->get();
        return view('admin.categories.create', compact('applications', 'mainCategories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'application_id' => 'required|in:1,2,3',
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = [
            'application_id' => $request->application_id,
            'name' => $request->name,
            'parent_id' => $request->parent_id ?? null,
            'sub_parent' => $request->sub_parent,
        ];

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/categories'), $imageName);
            $data['image'] = $imageName;
        }

        Category::create($data);

        return redirect()->route('categories.index')->with('success', 'Category added successfully.');
    }



    public function edit($id)
    {
        $category = Category::findOrFail($id);
        $applications = [
            '1' => 'Ingredients',
            '2' => 'Gluten Free',
            '3' => 'Organic Non-GMO'
        ];
        $mainCategories = Category::whereNull('parent_id')->where('id', '!=', $category->id)->get();

        return view('admin.categories.edit', compact('category', 'applications', 'mainCategories'));
    }


    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'application_id' => 'required|in:1,2,3',
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = [
            'application_id' => $request->application_id,
            'name' => $request->name,
            'parent_id' => $request->parent_id ?? null,
        ];


        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('img/categories'), $imageName);
            $data['image'] = $imageName;

            if ($category->image && file_exists(public_path('img/categories/' . $category->image))) {
                unlink(public_path('img/categories/' . $category->image));
            }
        }

        $category->update($data);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }



    public function destroy($id)
    {
        $category = Category::findOrFail($id);


        if ($category->image && file_exists(public_path('img/categories/' . $category->image))) {
            unlink(public_path('img/categories/' . $category->image));
        }

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }

    public function getChildren($categoryId)
    {
        $subCategories = Category::where('parent_id', $categoryId)
            ->get(['id', 'name', 'sub_parent']);

        return response()->json($subCategories);
    }

    public function getByApplication($applicationId)
    {
        $categories = Category::where('application_id', $applicationId)
            ->whereNull('parent_id')
            ->get(['id', 'name']);
        
        return response()->json($categories);
    }

}
