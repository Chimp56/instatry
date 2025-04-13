from ninja import Router
from typing import List
from django.forms.models import model_to_dict
from src.service.product_service import ProductService
from src.schema.product_schema import ProductCreateSchema, ProductResponseSchema

router = Router()

@router.post("/", response=ProductResponseSchema)
def create_product(request, product: ProductCreateSchema):
    product_instance = ProductService.create_product(product.dict())
    return model_to_dict(product_instance) 

@router.get("/{product_id}", response=ProductResponseSchema)
def get_product(request, product_id: int):
    product_instance = ProductService.get_product_by_id(product_id)
    if not product_instance:
        return {"error": "Product not found"}
    return model_to_dict(product_instance)

@router.get("/", response=List[ProductResponseSchema])
def list_products(request):
    products = ProductService.list_products()
    return [model_to_dict(product) for product in products]

@router.delete("/{product_id}")
def delete_product(request, product_id: int):
    deleted_count = ProductService.delete_product(product_id)
    return {"deleted": bool(deleted_count)}
