from src.model.order import Order

class OrderRepository:
    @staticmethod
    def create_order(order_data):
        return Order.objects.create(**order_data)

    @staticmethod
    def get_order_by_id(order_id):
        return Order.objects.filter(id=order_id).first()

    @staticmethod
    def get_all_orders():
        return Order.objects.all()

    @staticmethod
    def delete_order(order_id):
        return Order.objects.filter(id=order_id).delete()
