from django.db import models

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=80, blank=True, null=False)
    content = models.TextField(blank=True, null=False)
    author = models.CharField(max_length=40, blank=True, null=False)
    date_published = models.DateField(auto_now_add=True, blank=True)
    thumbnail = models.ImageField(upload_to='thumbnail/', null=False, blank=True)

    def __str__(self) -> str:
        return f"{self.title} | {self.author}"