<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyReview extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'author_name', 'rating', 'comment', 'source'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    protected static function booted(): void
    {
        static::created(fn($review) => $review->company->recalculateRating());
        static::updated(fn($review) => $review->company->recalculateRating());
        static::deleted(fn($review) => $review->company->recalculateRating());
    }
}
