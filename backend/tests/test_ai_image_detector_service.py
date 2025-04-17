import unittest
from src.service.ai_image_detector_service import AIImageDetectorService
import os

class TestAIImageDetectorService(unittest.TestCase):

    def setUp(self):
        self.service = AIImageDetectorService()

    def test_image_detection(self):
        
        test_image = "file_storage/assets/products/images/redshirt.png"
        full_path = os.path.abspath(test_image)
        result = self.service.detect_image(full_path)
        self.assertIsInstance(result, list)

if __name__ == '__main__':
    unittest.main()