from django.apps import AppConfig


class GencapappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gencapapp'

    def ready(self):
    	import gencapapp.signals
