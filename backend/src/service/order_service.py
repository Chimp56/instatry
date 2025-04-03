from src.repository.order_repository import OrderRepository

class OrderService:
    @staticmethod
    def create_order(order_data):
        return OrderRepository.create_order(order_data)

    @staticmethod
    def get_order(order_id):
        return OrderRepository.get_order_by_id(order_id)

    @staticmethod
    def list_orders():
        return OrderRepository.get_all_orders()

    @staticmethod
    def delete_order(order_id):
        return OrderRepository.delete_order(order_id)
