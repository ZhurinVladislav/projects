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
        Schema::table('company_ratings', function (Blueprint $table) {
            // Удаляем старые колонки
            $table->dropColumn(['average_rating', 'total_reviews']);

            // Добавляем новые колонки
            $table->string('type')->comment('Платформа: avito, yandex, google, etc');
            $table->string('link')->nullable()->comment('Ссылка на отзывы');
            $table->decimal('rating', 3, 1)->default(0)->comment('Рейтинг');
            $table->integer('total_reviews')->default(0)->comment('Количество отзывов');

            // Добавляем уникальный индекс чтобы избежать дубликатов
            $table->unique(['company_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_ratings', function (Blueprint $table) {
            $table->dropUnique(['company_id', 'type']);

            $table->dropColumn(['type', 'link', 'rating', 'total_reviews']);

            // Восстанавливаем старые колонки
            $table->decimal('average_rating', 3, 1)->default(0);
            $table->integer('total_reviews')->default(0);
        });
    }
};
