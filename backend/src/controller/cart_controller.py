from ninja import Router
from django.http import HttpResponseBadRequest, JsonResponse
from src.service.cart_service import CartService
from src.schema.cart_schema import CartResponseSchema, AddToCartSchema, RemoveFromCartSchema

router = Router()

@router.get("/", response=CartResponseSchema)
def get_cart(request, username: str):
    cart = CartService.get_cart(username)
    if not cart:
        return HttpResponseBadRequest("Cart not found for the given user")
    return {
        "user": username,
        "items": [
            {
                "product": item.product.id,
                "name": item.product.name,
                "price": item.product.price,
                "quantity": item.quantity,
            }
            for item in cart.items.all()
        ],
    }

@router.post("/add/", response=CartResponseSchema)
def add_to_cart(request, payload: AddToCartSchema):
    cart = CartService.add_to_cart(payload.username, payload.product_id, payload.quantity)
    return get_cart(request, username=payload.username)

@router.post("/remove/", response=CartResponseSchema)
def remove_from_cart(request, payload: RemoveFromCartSchema):
    CartService.remove_from_cart(payload.username, payload.product_id)
    return get_cart(request, username=payload.username)

@router.post("/clear/", response=CartResponseSchema)
def clear_cart(request, username: str):
    CartService.clear_cart(username)
    return get_cart(request, username=username)