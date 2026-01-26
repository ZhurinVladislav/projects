<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CompanyGallery extends Model
{
    use HasFactory;

    protected $table = 'company_gallery';
    protected $fillable = ['company_id', 'image_path', 'image_alt'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image_path ? url(Storage::url($this->image_path)) : null;
    }

    protected static function booted(): void
    {
        static::deleting(function (CompanyGallery $image) {
            if ($image->image_path && Storage::disk('public')->exists($image->image_path)) {
                Storage::disk('public')->delete($image->image_path);
            }
        });
    }
}
