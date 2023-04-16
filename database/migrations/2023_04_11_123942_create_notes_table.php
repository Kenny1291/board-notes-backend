<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('content', 2000)->nullable();
            $table->smallInteger('x_coordinate')->nullable();
            $table->smallInteger('y_coordinate')->nullable();
            $table->smallInteger('width')->nullable();
            $table->smallInteger('height')->nullable();
            $table->foreignId('temporary_user_id')->nullable();
            $table->smallInteger('z_index')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
