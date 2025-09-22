<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Title
            $table->string('vendor')->nullable(); // Vendor
            $table->unsignedBigInteger('application_id')->nullable(); // Application (FK to applications/categories)
            $table->unsignedBigInteger('category_id')->nullable(); // Category (FK to categories)
            $table->unsignedBigInteger('sub_category_id')->nullable(); // Sub-category (FK to categories if needed)
            $table->string('size')->nullable(); // Size
            $table->decimal('product_price', 10, 2)->nullable(); // Product Price
            $table->decimal('doubled_price', 10, 2)->nullable(); // Doubled Price
            $table->integer('variant_inventory_qty')->default(0); // Inventory Qty
            $table->text('images')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
