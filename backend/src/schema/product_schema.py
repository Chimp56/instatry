from pydantic import BaseModel, Field

class ProductCreateSchema(BaseModel):
    name: str = Field(..., max_length=255)
    description: str = Field(..., max_length=1000)
    price: float = Field(..., gt=0)
    image_filename: str = Field(..., max_length=255)
    overlay_model: str = Field(..., max_length=255)
    category: str = Field(..., max_length=255)
    tags: list[str] = Field(default_factory=list)
    class Config:
        orm_mode = True  # For ORM serialization

class ProductResponseSchema(ProductCreateSchema):
    id: int = Field(..., gt=0)
    class Config:
        orm_mode = True  # For ORM serialization
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Sample Product",
                "description": "This is a sample product.",
                "price": 19.99,
                "image_filename": "sample_image.jpg",
                "overlay_model": "sample_model",
                "category": "Sample Category",
                "tags": ["tag1", "tag2"]
            }
        }
