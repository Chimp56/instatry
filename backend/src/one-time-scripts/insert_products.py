# make api calls to insert products
import requests
import json


def insert_products():
    """
    Inserts a list of predefined products into a remote API.
    This function sends HTTP POST requests to a specified API endpoint to insert
    product data. Each product contains details such as name, description, price,
    image filename, overlay model, and category. The function logs the request body,
    response text, and the status of each insertion.
    Endpoint:
      http://localhost:8000/api/products/
    Headers:
      Content-Type: application/json
    Products:
      A predefined list of products with the following fields:
        - name (str): The name of the product.
        - description (str): A brief description of the product.
        - price (float): The price of the product.
        - image_filename (str): The filename of the product's image.
        - overlay_model (str): The filename of the product's 3D overlay model.
        - category (str): The category of the product.
    Logs:
      - The request body sent to the API.
      - The response text received from the API.
      - Success or failure message for each product insertion.
    Raises:
      Prints an error message if the API response status code is not 200.
    """
    url = "http://localhost:8000/api/products/"
    headers = {
        "Content-Type": "application/json"
    }

    products_data = [
        {
            "name": "Red T-Shirt",
            "description": "A stylish red t-shirt.",
            "price": 20.0,
            "image_filename": "images/redshirt.png",  
            "overlay_model": "models/red_t_shirt.gltf",  
            "category": "Top",
        },
        {
            "name": "Wizard Hat",
            "description": "A magical wizard hat.",
            "price": 30.0,
            "image_filename": "images/wizard_hat.png",
            "overlay_model": "models/wizards_hat_gltf/scene.gltf",
            "category": "Accessory",
        },
        {
            "name": "Victorian Dress",
            "description": "A beautiful Victorian dress.",
            "price": 50.0,
            "image_filename": "images/victorian_dress.png",
            "overlay_model": "models/victorian_dress/scene.gltf",
            "category": "Dress",
        }
    ]

    for product in products_data:
        response = requests.post(url, headers=headers, data=json.dumps(product))
        print("request", response.request.body)
        print("response", response.text)
        if response.status_code == 200:
            print(f"Inserted product: {product['name']}")
        else:
            print(f"Failed to insert product: {product['name']}. Status code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    insert_products()