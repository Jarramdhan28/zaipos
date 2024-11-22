<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $items = Item::with('category')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(7);

        $items->appends(['search' => $search]);

        return Inertia::render('Inventory/Item', [
            'items' => $items,
            'filters' => [
                'search' => $search
            ],
            'successMessage' => session('success')
        ]);
    }

    public function create()
    {
        $categories = Category::orderBy('created_at', 'desc')->get();

        return Inertia::render('Inventory/AddItem', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:225',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $item = Item::create($request->all());


        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $timestamp = Carbon::now()->format('Y_m_d_His');
                $fileName = $timestamp . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('item_images', $fileName, 'public');
                $item->images()->create(['image_path' => $path]);
            }
        }

        return redirect()->route('item.index')->with([
            'success' => 'Item added successfully',
        ]);
    }

    
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
