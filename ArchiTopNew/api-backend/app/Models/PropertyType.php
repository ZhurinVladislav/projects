<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyType extends Model
{
    use HasFactory;

    protected $table = 'property_types';
    protected $fillable = ['title', 'slug'];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_property_type');
    }
}
