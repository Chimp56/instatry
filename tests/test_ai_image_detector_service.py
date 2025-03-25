import unittest
from src.service.ai_image_detector_service import AIImageDetectorService

class TestAIImageDetectorService(unittest.TestCase):

    def setUp(self):
        self.service = AIImageDetectorService()

    def test_image_detection(self):
        test_image = "..\assets\images\temp\photomode_16112023_165018.png"
        result = self.service.detect(test_image)
        expected_result = "expected detection result"
        self.assertEqual(result, expected_result)

if __name__ == '__main__':
    unittest.main()