<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'isbn' => $this->isbn,
            'synopsis' => $this->synopsis,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_url' => $this->cover_url,
            'type' => $this->type,
            'stock' => $this->stock,
            'pages' => $this->pages,
            'publish_year' => $this->publish_year,
            'publisher' => $this->publisher,
            'price' => (float) $this->price,
            'rating' => (float) $this->rating,
            'reviews_count' => $this->reviews_count,
            'status' => $this->status,
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
