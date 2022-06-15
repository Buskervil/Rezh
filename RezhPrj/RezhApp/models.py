from abc import ABC, ABCMeta
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=256)
    short = models.CharField(max_length=1024, blank=True)
    content = models.TextField()
    
    def __str__(self):
        return self.title

class ArticleImage(models.Model):
    img = models.ImageField()
    caption = models.CharField(max_length=256, null=True, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='images')

    def __str__(self):
        return f'IMG: {self.article.title}'

class Sight(Article):
    pass

class Production(Article):
    pass

class History(Article):
    age = models.IntegerField(null=False)
    nested = models.BooleanField(default=False)

class Jobs(Article): # Эту модель нужно будет уточнить
    company = models.CharField(max_length=128, blank=True)
    contacts = models.CharField(max_length=255) 
    source = models.CharField(max_length=255, blank=True)
    salary = models.CharField(max_length=64, default='По договоренности')