from src.model.cart import Cart, CartItem
from src.model.product import Product
from django.contrib.auth.models import User

class CartRepository:
    @staticmethod
    def get_cart_for_user(username):
        user, _ = User.objects.get_or_create(username=username)
        return Cart.objects.get_or_create(user=user)[0]

    @staticmethod
    def add_to_cart(cart, product, quantity=1):
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        cart_item.save()
        return cart_item

    @staticmethod
    def remove_from_cart(cart, product):
        cart_item = CartItem.objects.filter(cart=cart, product=product).first()
        if cart_item:
            cart_item.delete()

    @staticmethod
    def clear_cart(cart):
        cart.items.all().delete()
