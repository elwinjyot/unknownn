from os import name
from django.urls import path
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', index, name='index'),
    path('blogs/', blogs, name='blogs'),
    path('create-blog/', csrf_exempt(createBlog), name='cblogs'),
    path('blog/<int:id>', showBlog, name='sblog'),
    path('imageUp/', csrf_exempt(upImg), name='upImg'),
    path('get-service-details/<str:name>', csrf_exempt(getServiceDetails), name='getServiceDetails'),
]