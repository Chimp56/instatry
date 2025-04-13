from pydantic import BaseModel
from typing import List

class CartItemSchema(BaseModel):
    product: int
    name: str
    price: float
    quantity: int

class CartResponseSchema(BaseModel):
    user: str
    items: List[CartItemSchema]

class AddToCartSchema(BaseModel):
    username: str
    product_id: int
    quantity: int = 1

class RemoveFromCartSchema(BaseModel):
    username: str
    product_id: int

class ClearCartSchema(BaseModel):
    username: str