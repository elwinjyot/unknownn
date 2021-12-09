import json
from django.http.response import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt, requires_csrf_token
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from .models import *
import os
from http import HTTPStatus
from django.conf import settings

# Create your views here.

def index(req):
    return render(req, 'index.html')


def blogs(req):
    blogs = Blog.objects.all()
    context = {
        'blogs': blogs,
        'blogsCount': len(blogs)
    }
    return render(req, 'blogs.html', context)

@requires_csrf_token
def createBlog(req):
    if req.is_ajax and req.method == 'POST':
        title = req.POST["title"]
        content = req.POST["content"]
        img = req.FILES["image"]
        print(title)
        print(img)
        # Blog.objects.create(title=title, content=content, author='Aman Burman')
        return JsonResponse({"status": 200}, safe=False)

    return render(req, 'createBlog.html')


def showBlog(req, id):
    return render(req, 'showBlog.html', {'blog': Blog.objects.get(id=id)})


@requires_csrf_token
def upImg(req):
    file = req.FILES['image']
    fs = FileSystemStorage()
    filename = str(file).split('.')[0]
    save_file = fs.save(filename, file)
    url = fs.url(save_file)
    print(url)
    return JsonResponse({"success": 1, "file": {"url": url}}, safe=False)


@requires_csrf_token
def getServiceDetails(req, name):
    with open(os.path.join(settings.BASE_DIR, "services.json"), "r") as file:
        data = json.load(file)
        try:
            ret_data = json.dumps(data[name])
        except:
            return JsonResponse(status=200, data={"status": 404, "message": "Couldn't get data! :("})
        finally:
            file.close()

    return JsonResponse(ret_data, safe=False)