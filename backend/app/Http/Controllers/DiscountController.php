<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class DiscountController extends Controller
{

    public function index()
    {

    }

   public function Create()
   {
    return view('admin.discounts.create');
   }
}




