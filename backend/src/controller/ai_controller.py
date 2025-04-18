from ninja import Router
from typing import List
from src.service.ai_image_detector_service import AIImageDetectorService
from src.schema.ai_image_detector_schema import ImageDetectionSchema
from src.schema.ai_image_detector_schema import ImageDetectionResponseSchema

router = Router()


@router.post("/detect", response=ImageDetectionResponseSchema)
def detect_image(request: ImageDetectionSchema):
    """
    Detect objects in an image using AI model.
    Args:
        request (ImageDetectionSchema): The request object containing the image data.
    Returns:
        ImageDetectionResponseSchema: The response object containing the detection results.
    """
    detection_results = AIImageDetectorService.detect_image(request.image)
    return ImageDetectionResponseSchema(detection_results=detection_results)