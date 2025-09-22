<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'title',
        'vendor',
        'application_id',
        'size',
        'product_price',
        'doubled_price',
        'variant_inventory_qty',
    ];



    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product')
            ->withPivot('is_subcategory');
    }

    public function mainCategories()
    {
        return $this->categories()->wherePivot('is_subcategory', false);
    }

    public function subCategories()
    {
        return $this->categories()->wherePivot('is_subcategory', true);
    }
}
