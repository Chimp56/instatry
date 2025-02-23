from ninja import Router
from typing import List
from src.service.order_service import OrderService
from src.schema.order_schema import OrderCreateSchema, OrderResponseSchema

router = Router()

@router.post("/", response=OrderResponseSchema)
def create_order(request, order: OrderCreateSchema):
    order_instance = OrderService.create_order(order.dict())
    return order_instance

@router.get("/test")
def test_response(request):
    return {"message": "test"}

@router.get("/{order_id}", response=OrderResponseSchema)
def get_order(request, order_id: int):
    order_instance = OrderService.get_order(order_id)
    if not order_instance:
        return {"error": "Order not found"}
    return order_instance

@router.get("/", response=List[OrderResponseSchema])
def list_orders(request):
    return OrderService.list_orders()

@router.delete("/{order_id}")
def delete_order(request, order_id: int):
    deleted_count = OrderService.delete_order(order_id)
    return {"deleted": bool(deleted_count)}



