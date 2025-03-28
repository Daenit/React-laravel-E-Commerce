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
            $table->unsignedBigInteger('category_id'); // Unsigned for FK reference
            $table->string('meta_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('slug')->unique();
            $table->string('name');
            $table->mediumText('description')->nullable();
            $table->string('brand'); 
            $table->decimal('selling_price', 10, 2); // Corrected decimal format
            $table->decimal('original_price', 10, 2); // Corrected decimal format
            $table->unsignedInteger('qty'); 
            $table->string('image')->nullable();
            $table->tinyInteger('featured')->default(0); 
            $table->tinyInteger('popular')->default(0); 
            $table->tinyInteger('status')->default(0);

            $table->timestamps();

            // Foreign key constraint
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products'); // Drop the table if it exists
    }
}
