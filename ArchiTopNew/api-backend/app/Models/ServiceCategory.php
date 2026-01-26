<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ServiceCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',       // связь с страницей
        'title',         // название категории
        'slug',          // SEO-friendly URL
        'description',   // описание
        'is_active',     // статус активности
        'sort_order',    // порядок сортировки
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Категория принадлежит странице.
     */
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'service_category_service')
            ->withTimestamps();
    }

    /**
     * Можно добавить связи с услугами, если есть таблица services.
     */
    // public function services()
    // {
    //     return $this->hasMany(Service::class);
    // }

    /**
     * Автоматическая генерация slug из title, если slug не передан.
     */
    protected static function booted()
    {
        static::creating(function ($category) {
            if (empty($category->slug) && !empty($category->title)) {
                $category->slug = Str::slug($category->title);
            }
        });
    }
}
