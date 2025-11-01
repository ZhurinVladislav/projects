<?php

namespace App\Http\Resources\v1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
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

        return [
            'id' => $this->id,
            'parentId' => $this->parent_id,
            'pageTitle' =>  $this->page_title,
            'alias' => $this->alias,
            'fullAlias' => $this->when(
                in_array(Route::currentRouteName(), [
                    'pages.show',
                    'pages.showByAlias'
                ]),
                $this->full_url
            ),
            'longTitle' => $this->when(
                in_array(Route::currentRouteName(), [
                    'pages.show',
                    'pages.showByAlias'
                ]),
                $this->long_title
            ),
            'description' => $this->when(
                in_array(Route::currentRouteName(), [
                    'pages.show',
                    'pages.showByAlias'
                ]),
                $this->description
            ),
            'keywords' => $this->when(
                in_array(Route::currentRouteName(), [
                    'pages.show',
                    'pages.showByAlias'
                ]),
                $this->keywords
            ),
            'content' => $this->when(
                in_array(Route::currentRouteName(), [
                    'pages.show',
                    'pages.showByAlias'
                ]),
                $this->content
            ),
            'isPublished' => (bool) $this->is_published,
            'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            // // SEO данные
            // 'seo' => [
            //     'title' => $this->page_title,
            //     'long_title' => $this->long_title,
            //     'description' => $this->description,
            //     'keywords' => $this->keywords,
            // ],

            // // Контент и статус
            // // 'content' => $this->content,
            // 'content' => $this->when(Route::currentRouteName() == 'categories.show', $this->content),
            // 'is_published' => (bool) $this->is_published,

            // // Вложенные страницы (если подгружены через with('children'))
            // 'children' => PageResource::collection($this->whenLoaded('children')),
        ];
    }
}
