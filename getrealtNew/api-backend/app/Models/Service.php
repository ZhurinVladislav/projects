<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'is_active',
    ];

    public function categories()
    {
        return $this->belongsToMany(ServiceCategory::class, 'service_category_service')
            ->withTimestamps();
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_services')->withTimestamps();
    }
}
