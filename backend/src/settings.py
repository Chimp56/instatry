import os
import dj_database_url

DEBUG = True

ROOT_URLCONF = "src.urls"  # Change "src" to your actual project module name

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",

    # Register your app
    "src.model.apps.ModelConfig", 
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Optional: Add custom template directories here
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",  # Required for sessions
    'corsheaders.middleware.CorsMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Required for authentication
    "django.contrib.messages.middleware.MessageMiddleware",  # Required for admin messages
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost").split(",")

SECRET_KEY = 'instatry_this'

if os.getenv("DOCKERIZED"):  # If running in Docker
    DATABASES = {
        "default": dj_database_url.config(default=os.getenv("DATABASE_URL")),
        "local": dj_database_url.config(env="LOCAL_DATABASE_URL"),
    }
else:  # If running locally
    from dotenv import load_dotenv
    from pathlib import Path
    BASE_DIR = Path(__file__).resolve().parent.parent  # Goes up one level
    load_dotenv(BASE_DIR / ".env")
    DATABASES = {
        "default": dj_database_url.config(default=os.getenv("DATABASE_URL"))
    }

# Static and media file settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'file_storage', 'assets', 'products')

print(f"MEDIA_ROOT: {MEDIA_ROOT}")