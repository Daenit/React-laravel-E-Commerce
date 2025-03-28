<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{

    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'product' => $product
        ]);
    }

    public function index()
    {
        try {
            $products = Product::with('category')->get();

            return response()->json([
                'status' => 200,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Server Error',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer',
            'slug' => 'nullable|max:191|unique:products,slug',
            'name' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|numeric|min:20',
            'original_price' => 'required|numeric|min:20',
            'qty' => 'required|integer|min:1',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }

        $product = new Product;
        $product->category_id = $request->category_id;
        $product->slug = $request->slug;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->meta_title = $request->meta_title;
        $product->meta_keyword = $request->meta_keyword;
        $product->meta_description = $request->meta_description;
        $product->brand = $request->brand;
        $product->selling_price = $request->selling_price;
        $product->original_price = $request->original_price;
        $product->qty = $request->qty;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move('uploads/image/', $fileName);
            $product->image = 'uploads/image/' . $fileName;
        }

        $product->featured = $request->featured ? '1' : '0';
        $product->popular = $request->popular ? '1' : '0';
        $product->status = $request->status ? '1' : '0';

        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product Added Successfully',
        ]);
    }

    public function edit($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product,
            ]);
        }
        return response()->json([
            'status' => 404,
            'message' => 'No Product Found',
        ], 404);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer',
            'slug' => "required|max:191|unique:products,slug,$id",
            'name' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|numeric|min:20',
            'original_price' => 'required|numeric|min:20',
            'qty' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product Not Found',
            ]);
        }

        $product->category_id = $request->category_id;
        $product->slug = $request->slug;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->meta_title = $request->meta_title;
        $product->meta_keyword = $request->meta_keyword;
        $product->meta_description = $request->meta_description;
        $product->brand = $request->brand;
        $product->selling_price = $request->selling_price;
        $product->original_price = $request->original_price;
        $product->qty = $request->qty;

        if ($request->hasFile('image')) {
            if (File::exists(public_path($product->image))) {
                File::delete(public_path($product->image));
            }
            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move('uploads/image/', $fileName);
            $product->image = 'uploads/image/' . $fileName;
        }

        $product->featured = $request->featured ? '1' : '0';
        $product->popular = $request->popular ? '1' : '0';
        $product->status = $request->status ? '1' : '0';

        $product->update();

        return response()->json([
            'status' => 200,
            'message' => 'Product Updated Successfully',
        ]);
    }

    public function viewProduct($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['status' => 404, 'message' => 'Product not found'], 404);
        }

        return response()->json(['status' => 200, 'product' => $product], 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'No Product ID Found',
            ]);
        }

        if (File::exists(public_path($product->image))) {
            File::delete(public_path($product->image));
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted Successfully',
        ]);
    }
}
