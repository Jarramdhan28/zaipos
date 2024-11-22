<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $categories = Category::query()
                    -> when($search,function ($query) use ($search){
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orderBy('created_at', 'desc')
                    ->paginate(7);

        $categories->appends(['search' => $search]);

        return Inertia::render('Inventory/Category', [
            'categories' => $categories,
            'filters' => [
                'search' => $search
            ],
            'successMessage' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia::render('Inventory/AddCategory');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categories' => 'required|array',
            'categories.*.name' => 'required|string|max:255', 
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->categories as $categoryData) {
            Category::create(['name' => $categoryData['name']]);
        }

        return redirect()->route('category.index')->with([
            'success' => 'Category added successfully',
        ]);
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return redirect()->route('category.index')->with('success', 'Category deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->route('category.index')->with('error', 'Failed to delete category. Please try again.');
        }
    }

    public function edit(Category $category)
    {
        $category = Category::findOrFail($category->id);
        return Inertia::render('Inventory/UpdateCategory', ['category' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::findOrFail($category->id);
        $category->update([
            'name' => $request->input('name'),
        ]);

        return redirect()->route('category.index')->with('success', 'Category updated successfully!');
    }
}
