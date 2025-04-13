from src.model.product import Product

class ProductRepository:
    @staticmethod
    def create_product(product_data):
        return Product.objects.create(**product_data)

    @staticmethod
    def get_product_by_id(product_id):
        return Product.objects.filter(id=product_id).first()

    @staticmethod
    def get_all_products():
        return Product.objects.all()

    @staticmethod
    def delete_product(product_id):
        return Product.objects.filter(id=product_id).delete()