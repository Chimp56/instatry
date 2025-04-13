# make api calls to insert products
import requests
import json

""" 
export const productsData = [
  {
    id: 1,
    name: "Red T-Shirt",
    price: 20.0,
    image: "/assets/redshirt.png", // Image in public/assets
    overlayModel: "/models/red_t_shirt.gltf", // 3D model in public/models
    description: "A stylish red t-shirt.",
    category: "Top"
  },
  {
    id: 2,
    name: "Wizard Hat",
    price: 30.0,
    image: "/assets/wizard_hat.png",
    overlayModel: "/models/wizards_hat_gltf/scene.gltf",
    description: "A magical wizard hat.",
    category: "Accessory"
  },
  {
    id: 3,
    name: "Victorian Dress",
    price: 50.0,
    image: "/assets/victorian_dress.png",
    overlayModel: "/models/victorian_dress/scene.gltf",
    description: "A beautiful Victorian dress.",
    category: "Dress"
  },
];

 """
def insert_products():
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
            "tags": ""
        },
        {
            "name": "Wizard Hat",
            "description": "A magical wizard hat.",
            "price": 30.0,
            "image_filename": "images/wizard_hat.png",
            "overlay_model": "models/wizards_hat_gltf/scene.gltf",
            "category": "Accessory",
            "tags": ""
        },
        {
            "name": "Victorian Dress",
            "description": "A beautiful Victorian dress.",
            "price": 50.0,
            "image_filename": "images/victorian_dress.png",
            "overlay_model": "models/victorian_dress/scene.gltf",
            "category": "Dress",
            "tags": ""
        }
    ]

    for product in products_data:
        response = requests.post(url, headers=headers, data=json.dumps(product))
        if response.status_code == 201:
            print(f"Inserted product: {product['name']}")
        else:
            print(f"Failed to insert product: {product['name']}. Status code: {response.status_code}, Response: {response.text}")
    