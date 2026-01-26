<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'title',
        'introtext',
        'image_path',
        'image_alt',
        'phone',
        'email',
        'site_url',
        'experience',
        'address',
        'map_link',
        'promo',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
    // public function page()
    // {
    //     return $this->belongsTo(Page::class);
    // }
    public function page()
    {
        return $this->belongsTo(Page::class, 'page_id');
    }


    public function socials()
    {
        return $this->hasMany(CompanySocial::class);
    }

    public function servicesLinks()
    {
        return $this->hasMany(CompanyServicesLink::class);
    }

    public function workdays()
    {
        return $this->hasMany(CompanyWorkday::class);
    }

    public function gallery()
    {
        return $this->hasMany(CompanyGallery::class);
    }

    public function reviews()
    {
        return $this->hasMany(CompanyReview::class);
    }

    // Обновляем связь с рейтингами (теперь один ко многим)
    public function ratings()
    {
        return $this->hasMany(CompanyRating::class);
    }

    public function rating()
    {
        return $this->hasOne(CompanyRating::class)->oldest();
    }

    public function serviceCategories()
    {
        return $this->belongsToMany(ServiceCategory::class, 'company_service_categories')->withTimestamps();
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'company_services')->withTimestamps();
    }

    /**
     * 🔹 Новая связь: типы недвижимости
     */
    public function propertyTypes()
    {
        return $this->belongsToMany(PropertyType::class, 'company_property_type');
    }

    /*
    |--------------------------------------------------------------------------
    | Boot Logic
    |--------------------------------------------------------------------------
    */
    protected static function booted(): void
    {
        static::deleting(function (Company $company) {
            // Удаляем основное изображение
            if ($company->image_path && Storage::disk('public')->exists($company->image_path)) {
                Storage::disk('public')->delete($company->image_path);
            }

            // Удаляем изображения галереи
            foreach ($company->gallery as $item) {
                if ($item->image_path && Storage::disk('public')->exists($item->image_path)) {
                    Storage::disk('public')->delete($item->image_path);
                }
            }

            // Каскадное удаление зависимостей
            $company->socials()->delete();
            $company->servicesLinks()->delete();
            $company->workdays()->delete();
            $company->gallery()->delete();
            $company->reviews()->delete();
            $company->ratings()->delete(); // Обновляем на ratings()

            // Отвязываем связи M:N
            $company->serviceCategories()->detach();
            $company->services()->detach();
            $company->propertyTypes()->detach(); // 🔹 новое
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */
    public function recalculateRating(): void
    {
        $average = $this->reviews()->avg('rating') ?? 0;
        $total = $this->reviews()->count();

        $this->rating()->updateOrCreate(
            ['company_id' => $this->id],
            ['average_rating' => $average, 'total_reviews' => $total]
        );
    }

    public function getAverageRatingAttribute(): float
    {
        return round($this->ratings->avg('rating') ?? 0, 1);
    }

    /**
     * Получить общее количество отзывов по всем платформам
     */
    public function getTotalReviewsAttribute(): int
    {
        return $this->ratings->sum('total_reviews');
    }

    /**
     * Получить рейтинг по конкретной платформе
     */
    public function getRatingByType(string $type): ?CompanyRating
    {
        return $this->ratings->where('type', $type)->first();
    }
}
