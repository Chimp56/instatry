from pydantic import BaseModel
from typing import List

class CartItemSchema(BaseModel):
    product: int
    name: str
    price: float
    quantity: int

class CartResponseSchema(BaseModel):
    user: int
    items: List[CartItemSchema]
