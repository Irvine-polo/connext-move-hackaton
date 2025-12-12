<?php

namespace App\Models\Move;

use Illuminate\Database\Eloquent\Model;

class MoveTransportRequest extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
