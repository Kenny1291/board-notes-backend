<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
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
            'content' => $this->content,
            'x_coordinate' => $this->x_coordinate,
            'y_coordinate' => $this->y_coordinate,
            'width' => $this->width,
            'height' => $this->height,
            'z_index' => $this->z_index,
        ];
    }
}
