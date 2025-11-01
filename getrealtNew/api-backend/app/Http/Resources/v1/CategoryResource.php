<?php

namespace App\Http\Resources\v1;

// use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'content' => $this->when(Route::currentRouteName() == 'categories.show', $this->content),
            // 'link' => $this->link,
            // 'pageTitle' => $this->when(Route::currentRouteName() == 'categories.show', $this->page_title),
            // 'description' => $this->when(Route::currentRouteName() == 'categories.show', $this->description),
            // 'keywords' => $this->when(Route::currentRouteName() == 'categories.show', $this->keywords),
            // 'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            // 'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
        ];
    }
}
