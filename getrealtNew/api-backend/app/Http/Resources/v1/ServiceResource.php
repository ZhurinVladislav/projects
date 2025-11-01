<?php

namespace App\Http\Resources\v1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        // 🔹 Загружаем категории, если ещё не загружены
        $this->loadMissing('categories');

        return [
            'id' => $this->id,
            'title' => $this->title,
            'isActive' => (bool) $this->is_active,
            // 'categories' => ServiceCategoryResource::collection($this->categories),

            // Только ID категорий
            'category_ids' => $this->categories->pluck('id'),
            'categories' => ServiceCategoryResource::collection($this->whenLoaded('categories')),
            'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}
