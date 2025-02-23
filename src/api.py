from ninja import NinjaAPI
from src.controller.order_controller import router as order_router

api = NinjaAPI()
api.add_router("/orders", order_router)
