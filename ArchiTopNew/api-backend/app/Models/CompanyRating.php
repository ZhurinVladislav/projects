<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'type',
        'link',
        'rating',
        'total_reviews'
    ];

    // Доступные типы платформ
    const TYPES = [
        'avito' => 'Авито',
        'yandex' => 'Яндекс',
        'google' => 'Google',
        'flamp' => 'Фламп',
        'yell' => 'Yell',
        '2gis' => '2ГИС',
        'zoon' => 'Zoon'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Получить человеко-читаемое название платформы
     */
    public function getTypeNameAttribute(): string
    {
        return self::TYPES[$this->type] ?? $this->type;
    }
}
