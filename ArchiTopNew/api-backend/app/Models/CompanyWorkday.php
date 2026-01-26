<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyWorkday extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'day', 'hours', 'is_day_off'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
