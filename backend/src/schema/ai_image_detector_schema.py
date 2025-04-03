from pydantic import BaseModel, Field
from typing import Optional

class ImageDetectionSchema(BaseModel):
    image_filename: str = Field(..., max_length=255)