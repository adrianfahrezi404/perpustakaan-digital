<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date?->toDateString(),
            'description' => $this->description,
            'category' => $this->category,
            'amount' => (float) $this->amount,
            'status' => $this->status,
            'loan_id' => $this->loan_id,
        ];
    }
}
