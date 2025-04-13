from django.contrib import admin
from django.urls import path
from src.api import api  # Import the NinjaAPI instance
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),  # Django Admin Panel
    path("api/", api.urls),  # Mount Ninja API at `/api/`
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   # Serve media files


print(urlpatterns)

import os
# list all files in the MEDIA_ROOT directory
print(os.listdir(settings.MEDIA_ROOT))

print(os.path.join(settings.MEDIA_ROOT, 'redshirt.png'))
print(os.path.exists(os.path.join(settings.MEDIA_ROOT, 'redshirt.png')))
print(os.path.exists(settings.MEDIA_ROOT))