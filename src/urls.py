from django.contrib import admin
from django.urls import path
from src.api import api  # Import the NinjaAPI instance

urlpatterns = [
    path("admin/", admin.site.urls),  # Django Admin Panel
    path("api/", api.urls),  # Mount Ninja API at `/api/`
]
