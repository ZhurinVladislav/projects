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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title');
            $table->string('introtext', 500)->nullable();
            $table->string('image_path')->nullable(); // путь к файлу
            $table->string('image_alt')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('site_url')->nullable();
            $table->string('experience')->nullable();
            $table->string('address')->nullable();
            $table->string('map_link')->nullable();
            $table->boolean('promo')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
