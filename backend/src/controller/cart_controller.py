from ninja import Router
from django.shortcuts import get_object_or_404
from src.model.cart import Cart, CartItem
from src.model.product import Product
from src.schema.cart_schema import CartItemSchema, CartResponseSchema

router = Router()

@router.get("/", response=CartResponseSchema)
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    return {
        "user": request.user.id,
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
def add_to_cart(request, product_id: int, quantity: int = 1):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += quantity
    cart_item.save()
    return get_cart(request)

@router.post("/remove/", response=CartResponseSchema)
def remove_from_cart(request, product_id: int):
    cart = get_object_or_404(Cart, user=request.user)
    cart_item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
    cart_item.delete()
    return get_cart(request)

@router.post("/clear/", response=CartResponseSchema)
def clear_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart.items.all().delete()
    return get_cart(request)
