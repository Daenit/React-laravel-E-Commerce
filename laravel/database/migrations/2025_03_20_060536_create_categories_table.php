<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('meta_title')->nullable();
            $table->mediumText('meta_keyword')->nullable();
            $table->mediumText('meta_description')->nullable();
            $table->string('slug')->unique(); // Ensures unique category slugs
            $table->string('name');
            $table->longText('description')->nullable();
            $table->tinyInteger('status')->default(1); // Default to active (1)
            $table->tinyInteger('is_featured')->default(0); // Added example column for featured categories
            $table->timestamps(); // Adds created_at & updated_at fields
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
