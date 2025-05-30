from ninja import NinjaAPI
from src.controller.order_controller import router as order_router
from src.controller.product_controller import router as product_router

api = NinjaAPI(title="InstaTry API", docs_url="/docs")
api.add_router("/orders", order_router)
api.add_router("/products", product_router)
