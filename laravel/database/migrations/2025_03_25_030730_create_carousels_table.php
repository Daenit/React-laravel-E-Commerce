<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('carousels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('text');
            $table->string('button1_text')->nullable();
            $table->string('button1_link')->nullable();
            $table->string('button2_text')->nullable();
            $table->string('button2_link')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('carousels');
    }
};
