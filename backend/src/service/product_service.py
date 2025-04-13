from src.repository.product_repository import ProductRepository

class ProductService:
    @staticmethod
    def create_product(product_data):
        return ProductRepository.create_product(product_data)
    
    @staticmethod
    def get_product_by_id(product_id):
        return ProductRepository.get_product_by_id(product_id)
    
    @staticmethod
    def list_products():
        return ProductRepository.get_all_products()
    
    @staticmethod
    def delete_product(product_id):
        return ProductRepository.delete_product(product_id)
