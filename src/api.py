from ninja import NinjaAPI
from src.controller.order_controller import router as order_router

api = NinjaAPI(title="InstaTry API", docs_url="/docs")
api.add_router("/orders", order_router)
