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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();

            // Связь с родительской страницей (nullable — корневые страницы)
            $table->foreignId('parent_id')->nullable()->constrained('pages')->onDelete('cascade');

            // Основные SEO поля
            $table->string('page_title');
            $table->string('long_title')->nullable();
            $table->text('description')->nullable();
            $table->string('keywords')->nullable();

            // alias для URL (уникальный)
            $table->string('alias')->unique();

            // Можно добавить статус (например, опубликована / черновик)
            $table->boolean('is_published')->default(true);

            // Контент страницы (если хочешь хранить текст)
            $table->longText('content')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
