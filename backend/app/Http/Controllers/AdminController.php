<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Contact;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard');
    }

    public function profile()
    {
        $admin = Auth::user();
        return view('admin.profile', compact('admin'));
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . Auth::id()
        ]);

        $admin = Auth::user();
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->save();

        return back()->with('success', 'Profile updated successfully');
    }

    public function uppassword(Request $request)
    {
        $admin = Auth::user();
        return view('admin.change-password', compact('admin'));
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if (!Hash::check($request->current_password, Auth::user()->password)) {
            return back()->withErrors(['current_password' => 'Current password does not match']);
        }

        $admin = Auth::user();
        $admin->password = Hash::make($request->password);
        $admin->save();

        return back()->with('success', 'Password changed successfully');
    }

    public function all_req()
    {
       
        $contacts = Contact::latest()->get();

        
        return view('admin.all-requests', compact('contacts'));
    }
}
