from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Sight)
admin.site.register(models.Production)
admin.site.register(models.Jobs)
admin.site.register(models.History)
admin.site.register(models.ArticleImage)