# Use a pipeline as a high-level helper
from transformers import pipeline
from PIL import Image
from os.path import abspath, join
# https://huggingface.co/Organika/sdxl-detector
pipe = pipeline("image-classification", model="Organika/sdxl-detector")

class AIImageDetectorService:
    @staticmethod
    def detect_image(image_path):
        # Detect image
        result = pipe(image_path)
        return result
    
if __name__ == '__main__':
    service = AIImageDetectorService()
    test_image = join(abspath(__file__), "..\..\\assets\images\\temp\photomode_16112023_165018.png")
    print(test_image)

    result = service.detect_image(test_image)
    print(result)