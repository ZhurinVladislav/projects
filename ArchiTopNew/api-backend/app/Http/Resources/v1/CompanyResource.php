<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

class CompanyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pageId' => $this->page_id,
            'title' => $this->title,
            'introText' => $this->introtext,
            'image' => $this->image_path ? asset('storage/' . $this->image_path) : null,
            'imageAlt' => $this->image_alt,
            'phone' => $this->phone,
            'email' => $this->email,
            'siteUrl' => $this->site_url,
            'experience' => $this->experience,
            'address' => $this->address,
            'mapLink' => $this->map_link,
            'promo' => (bool) $this->promo,

            // 🔹 Рейтинги (обновлено)
            'rating' => $this->average_rating, // Используем аксессор
            'totalReviews' => $this->total_reviews, // Используем аксессор
            'ratings' => CompanyRatingResource::collection($this->whenLoaded('ratings')),

            // 🔹 Связи
            'socials' => CompanySocialResource::collection($this->whenLoaded('socials')),
            'servicesLinks' => CompanyServicesLinkResource::collection($this->whenLoaded('servicesLinks')),
            'workdays' => CompanyWorkdayResource::collection($this->whenLoaded('workdays')),
            'gallery' => CompanyGalleryResource::collection($this->whenLoaded('gallery')),
            'reviews' => CompanyReviewResource::collection($this->whenLoaded('reviews')),

            // 🔹 Категории и услуги
            'serviceCategories' => ServiceCategoryResource::collection(
                $this->serviceCategories->map(function ($category) {
                    $category->company_id_for_filter = $this->id;
                    return $category;
                })
            ),
            'services' => ServiceResource::collection($this->whenLoaded('services')),

            // 🔹 Типы недвижимости
            'propertyTypes' => PropertyTypeResource::collection($this->whenLoaded('propertyTypes')),

            // ✅ Относительный путь
            'url' => $this->when(
                in_array(Route::currentRouteName(), [
                    'companies.by-category',
                    'companies.by-page',
                    'companies.page',
                ]),
                $this->getRelativeUrl()
            ),

            'created' => $this->created_at?->toDateTimeString(),
            'updated' => $this->updated_at?->toDateTimeString(),
        ];
    }

    /**
     * Построение относительного пути к странице компании.
     */
    protected function getRelativeUrl(): ?string
    {
        // 1️⃣ Если у компании есть связанная страница (с parent)
        if ($this->relationLoaded('page') && $this->page) {
            $segments = [];
            $current = $this->page;

            while ($current) {
                if ($current->alias) {
                    array_unshift($segments, $current->alias);
                }
                $current = $current->parent ?? null;
            }

            if ($this->slug) {
                $segments[] = $this->slug;
            }

            return '/' . implode('/', $segments);
        }

        // 2️⃣ Если есть slug компании и категория
        if ($this->relationLoaded('serviceCategories') && $this->serviceCategories->isNotEmpty()) {
            $category = $this->serviceCategories->first();
            if ($category?->slug && $this->slug) {
                return '/' . $category->slug . '/' . $this->slug;
            }
        }

        // 3️⃣ Если просто slug компании
        if ($this->slug) {
            return '/companies/' . $this->slug;
        }

        return null;
    }
}

// class CompanyResource extends JsonResource
// {
//     public function toArray(Request $request): array
//     {
//         return [
//             'id' => $this->id,
//             'pageId' => $this->page_id,
//             'title' => $this->title,
//             'introText' => $this->introtext,
//             'image' => $this->image_path ? asset('storage/' . $this->image_path) : null,
//             'imageAlt' => $this->image_alt,
//             'phone' => $this->phone,
//             'email' => $this->email,
//             'siteUrl' => $this->site_url,
//             'experience' => $this->experience,
//             'address' => $this->address,
//             'mapLink' => $this->map_link,
//             'promo' => (bool) $this->promo,

//             // 🔹 Рейтинг
//             'rating' => $this->rating?->average_rating ?? 0,
//             'totalReviews' => $this->rating?->total_reviews ?? 0,

//             // 🔹 Связи
//             'socials' => CompanySocialResource::collection($this->whenLoaded('socials')),
//             'servicesLinks' => CompanyServicesLinkResource::collection($this->whenLoaded('servicesLinks')),
//             'workdays' => CompanyWorkdayResource::collection($this->whenLoaded('workdays')),
//             'gallery' => CompanyGalleryResource::collection($this->whenLoaded('gallery')),
//             'reviews' => CompanyReviewResource::collection($this->whenLoaded('reviews')),

//             // 🔹 Категории и услуги
//             // 'serviceCategories' => ServiceCategoryResource::collection($this->whenLoaded('serviceCategories')),
//             'serviceCategories' => ServiceCategoryResource::collection(
//                 $this->serviceCategories->map(function ($category) {
//                     // передадим company_id через request merge
//                     $category->company_id_for_filter = $this->id;
//                     return $category;
//                 })
//             ),
//             'services' => ServiceResource::collection($this->whenLoaded('services')),

//             // 🔹 Типы недвижимости
//             'propertyTypes' => PropertyTypeResource::collection($this->whenLoaded('propertyTypes')),

//             // ✅ Относительный путь
//             'url' => $this->when(
//                 in_array(Route::currentRouteName(), [
//                     'companies.by-category',
//                     'companies.by-page',
//                     'companies.page',
//                 ]),
//                 $this->getRelativeUrl()
//             ),

//             'created' => $this->created_at?->toDateTimeString(),
//             'updated' => $this->updated_at?->toDateTimeString(),
//         ];
//     }

//     /**
//      * Построение относительного пути к странице компании.
//      */
//     protected function getRelativeUrl(): ?string
//     {
//         // 1️⃣ Если у компании есть связанная страница (с parent)
//         if ($this->relationLoaded('page') && $this->page) {
//             $segments = [];
//             $current = $this->page;

//             while ($current) {
//                 if ($current->alias) {
//                     array_unshift($segments, $current->alias);
//                 }
//                 $current = $current->parent ?? null;
//             }

//             if ($this->slug) {
//                 $segments[] = $this->slug;
//             }

//             return '/' . implode('/', $segments);
//         }

//         // 2️⃣ Если есть slug компании и категория
//         if ($this->relationLoaded('serviceCategories') && $this->serviceCategories->isNotEmpty()) {
//             $category = $this->serviceCategories->first();
//             if ($category?->slug && $this->slug) {
//                 return '/' . $category->slug . '/' . $this->slug;
//             }
//         }

//         // 3️⃣ Если просто slug компании
//         if ($this->slug) {
//             return '/companies/' . $this->slug;
//         }

//         return null;
//     }
// }
