<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'parent_id',
        'page_title',
        'long_title',
        'description',
        'keywords',
        'alias',
        'is_published',
        'content',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($page) {
            if ($page->isDirty('alias')) {
                if (empty($page->alias)) {
                    $page->alias = $page->generateSlug($page->page_title);
                } else {
                    $page->alias = $page->generateSlug($page->alias);
                }

                $originalAlias = $page->alias;
                $counter = 1;

                while (
                    static::where('alias', $page->alias)
                    ->where('parent_id', $page->parent_id)
                    ->where('id', '!=', $page->id)
                    ->exists()
                ) {
                    $page->alias = $originalAlias . '-' . $counter++;
                }
            }
        });
    }

    // Транслитерация и очистка alias
    public function generateSlug(string $value): string
    {
        $map = [
            'а' => 'a',
            'б' => 'b',
            'в' => 'v',
            'г' => 'g',
            'д' => 'd',
            'е' => 'e',
            'ё' => 'e',
            'ж' => 'zh',
            'з' => 'z',
            'и' => 'i',
            'й' => 'y',
            'к' => 'k',
            'л' => 'l',
            'м' => 'm',
            'н' => 'n',
            'о' => 'o',
            'п' => 'p',
            'р' => 'r',
            'с' => 's',
            'т' => 't',
            'у' => 'u',
            'ф' => 'f',
            'х' => 'h',
            'ц' => 'ts',
            'ч' => 'ch',
            'ш' => 'sh',
            'щ' => 'sch',
            'ъ' => '',
            'ы' => 'y',
            'ь' => '',
            'э' => 'e',
            'ю' => 'yu',
            'я' => 'ya',
        ];

        $value = mb_strtolower(trim($value), 'UTF-8');
        $value = strtr($value, $map);
        $value = preg_replace('/[^a-z0-9]+/u', '-', $value);
        return trim($value, '-');
    }

    // Родитель
    public function parent()
    {
        return $this->belongsTo(Page::class, 'parent_id');
    }

    // Дети
    public function children()
    {
        return $this->hasMany(Page::class, 'parent_id');
    }

    // Полный URL
    public function getFullUrlAttribute(): string
    {
        $segments = [];
        $page = $this;
        while ($page) {
            $segments[] = $page->alias;
            $page = $page->parent;
        }
        return '/' . implode('/', array_reverse($segments));
    }

    public function serviceCategories()
    {
        return $this->hasMany(ServiceCategory::class);
    }
}
