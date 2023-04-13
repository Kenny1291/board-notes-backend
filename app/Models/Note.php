<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content',
        'x_coordinate',
        'y_coordinate',
        'width',
        'height',
    ];

    public function temporaryUser(): BelongsTo
    {
        return $this->belongsTo(TemporaryUser::class);
    }
}
