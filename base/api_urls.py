from typing import List

from django.urls import include, path

urlpatterns = [
    path("media/", include("apps.media.api.urls")),
]
