from pydantic import BaseModel, Field
from typing import Optional

class OrderCreateSchema(BaseModel):
    customer_name: str = Field(..., max_length=255)
    product_name: str = Field(..., max_length=255)
    quantity: int = Field(..., gt=0)
    total_price: float = Field(..., gt=0)

class OrderResponseSchema(OrderCreateSchema):
    id: int
    created_at: str  # ISO format timestamp

    class Config:
        from_attributes = True  # For ORM serialization
