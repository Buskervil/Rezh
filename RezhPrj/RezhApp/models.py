from abc import ABC, ABCMeta
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    short = models.CharField(max_length=1000, null=True)
    content = models.TextField()

class ArticleImage(models.Model):
    img = models.ImageField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

class Sight(Article):
    pass

class Production(Article):
    pass

class History(Article):
    pass

class Jobs(Article): # Это модель нужно будет уточнить
    company = models.CharField(max_length=255)
    contacts = models.CharField(max_length=255) 
    source = models.CharField(max_length=255)