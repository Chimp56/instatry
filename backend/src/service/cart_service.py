from src.repository.cart_repository import CartRepository
from src.model.product import Product

class CartService:
    @staticmethod
    def get_cart(user):
        cart = CartRepository.get_cart_for_user(user)
        return cart

    @staticmethod
    def add_to_cart(user, product_id, quantity):
        cart = CartRepository.get_cart_for_user(user)
        product = Product.objects.get(id=product_id)
        return CartRepository.add_to_cart(cart, product, quantity)

    @staticmethod
    def remove_from_cart(user, product_id):
        cart = CartRepository.get_cart_for_user(user)
        product = Product.objects.get(id=product_id)
        CartRepository.remove_from_cart(cart, product)

    @staticmethod
    def clear_cart(user):
        cart = CartRepository.get_cart_for_user(user)
        CartRepository.clear_cart(cart)