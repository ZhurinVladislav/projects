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
        // Полностью пересоздаем таблицу с правильной структурой
        Schema::dropIfExists('company_ratings');

        Schema::create('company_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->string('link')->nullable();
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('total_reviews')->default(0);

            // Уникальный индекс
            $table->unique(['company_id', 'type']);

            // Временные метки В КОНЦЕ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_ratings');

        // Восстанавливаем оригинальную структуру
        Schema::create('company_ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->decimal('average_rating', 3, 1)->default(0);
            $table->integer('total_reviews')->default(0);
            $table->timestamps();
        });
    }
};
