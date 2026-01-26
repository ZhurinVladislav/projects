<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyServicesLink extends Model
{
    use HasFactory;

    protected $table = 'company_services_links';
    protected $fillable = ['company_id', 'service_name', 'url'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
