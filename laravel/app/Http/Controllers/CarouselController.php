<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carousel;
use Illuminate\Support\Facades\Validator;

class CarouselController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'button1_text' => 'nullable|string|max:255',
            'button1_link' => 'nullable|string|max:255',
            'button2_text' => 'nullable|string|max:255',
            'button2_link' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 400, 'errors' => $validator->errors()]);
        }

        $carousel = new Carousel();
        $carousel->name = $request->name;
        $carousel->text = $request->text;
        $carousel->button1_text = $request->button1_text;
        $carousel->button1_link = $request->button1_link;
        $carousel->button2_text = $request->button2_text;
        $carousel->button2_link = $request->button2_link;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/carousel/'), $imageName);
            $carousel->image = 'uploads/carousel/' . $imageName;
        }

        $carousel->save();

        return response()->json(['status' => 200, 'message' => 'Carousel item added successfully!']);
    }

    public function index()
    {
        $carousels = Carousel::all();
        return response()->json([
            'status' => 200,
            'carousels' => $carousels
        ]);

    }

    public function destroy($id)
    {
        $carousel = Carousel::find($id);
        if ($carousel) {
            if (file_exists(public_path($carousel->image))) {
                unlink(public_path($carousel->image));
            }
            $carousel->delete();
            return response()->json(['message' => 'Carousel item deleted successfully']);
        } else {
            return response()->json(['message' => 'Carousel item not found'], 404);
        }
    }
}
