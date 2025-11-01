<?php

namespace App\Http\Resources\v1;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyReviewResource extends JsonResource
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
            'authorName' => $this->author_name,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'source' => $this->source,
            'created' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
        ];
    }
}
