<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(), // Fixed typo
            ], 422);
        } else {
            try {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);

                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Registered Successfully', // Fixed typo
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => 500,
                    'error' => 'Something went wrong!',
                    'message' => $e->getMessage(), // This helps debug the error
                ], 500);
            }
        }
    }

    public function login(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validation_errors' => $validator->errors(),
            ], 422);
        }
    
        // Find user by email
        $user = User::where('email', $request->email)->first();
    
        // Check user existence and password validity
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credentials',
            ], 401);
        }
    
        // Delete old tokens before issuing a new one (Optional - Security Enhancement)
        $user->tokens()->delete();
    
        // Generate new token based on role
        if ($user->role_as == 1) {
            $role = 'admin';    
            $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
        } else {
            $role = '';
            $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
        }
    
        return response()->json([
            'status' => 200,
            'username' => $user->name,
            'role' => $user->role_as,
            'token' => $token,
            'message' => 'Logged In Successfully',
            'role' => $role,
        ], 200);
    }
    
    public function logout()
    {
        $user = auth('sanctum')->user();
    
        if ($user) {
            $user->tokens()->delete(); // Logout from all devices
            return response()->json([
                'status' => 200,
                'message' => 'Logged out successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized: No user is logged in',
            ], 401);
        }
    }
    
    
}
