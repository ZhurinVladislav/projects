<?php

namespace App\Http\Resources\v1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

class ServiceCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Генерация полного пути через родительскую страницу
        $fullAlias = null;
        if ($this->relationLoaded('page') && $this->page) {
            $segments = [];
            $current = $this->page;
            while ($current) {
                if ($current->alias) {
                    array_unshift($segments, $current->alias);
                }
                $current = $current->parent ?? null;
            }
            $fullAlias = '/' . implode('/', $segments);
        }

        // ✅ Получаем company_id, переданный из CompanyResource
        $companyId = $this->company_id_for_filter ?? null;

        // ✅ Фильтруем услуги категории по компании
        $services = $this->whenLoaded('services', function () use ($companyId) {
            if (!$companyId) {
                return $this->services;
            }

            return $this->services->filter(function ($service) use ($companyId) {
                return $service->companies->pluck('id')->contains($companyId);
            });
        });

        return [
            'id' => $this->id,
            'pageId' => $this->page_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'fullAlias' => $this->when(
                in_array(Route::currentRouteName(), [
                    'service-categories.index',
                    'service-categories.show'
                ]),
                $fullAlias
            ),
            'description' => $this->description,
            'isActive' => (bool) $this->is_active,
            'services' => ServiceResource::collection($services),
            'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}

// class ServiceCategoryResource extends JsonResource
// {
//     /**
//      * Transform the resource into an array.
//      *
//      * @return array<string, mixed>
//      */
//     public function toArray(Request $request): array
//     {
//         // Генерация полного пути через родительскую страницу
//         $fullAlias = null;
//         if ($this->relationLoaded('page') && $this->page) {
//             $segments = [];
//             $current = $this->page;
//             while ($current) {
//                 if ($current->alias) {
//                     array_unshift($segments, $current->alias);
//                 }
//                 $current = $current->parent ?? null;
//             }
//             $fullAlias = '/' . implode('/', $segments);
//         }

//         return [
//             'id' => $this->id,
//             'pageId' => $this->page_id,
//             'title' => $this->title,
//             'slug' => $this->slug,
//             'fullAlias' => $this->when(
//                 in_array(Route::currentRouteName(), [
//                     'service-categories.index',
//                     'service-categories.show'
//                 ]),
//                 $fullAlias
//             ),
//             'description' => $this->description,
//             'isActive' => (bool) $this->is_active,
//             'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
//             'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
//             // 'slug' => $this->slug,
//             // 'page_id' => $this->page_id,
//             // 'title' => $this->title,
//             // 'slug' => $this->slug,
//             // 'description' => $this->description,
//             // 'is_active' => (bool) $this->is_active,
//             // 'sort_order' => $this->sort_order,
//             // 'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
//             // 'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),

//             // // Подгружаем страницу
//             // 'page' => $this->whenLoaded('page'),
//         ];
//     }
// }
