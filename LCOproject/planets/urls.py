from django.conf.urls import url

from . import views

urlpatterns = [
	# ex: /planets/
	url(r'^$', views.index, name='index'),
	# ex: /planets/4/
	url(r'^(?P<planet_id>[0-9]+)/$', views.detail, name='detail'),
	# ex: /planets/input/
	url(r'^inputplanet/$', views.inputplanet, name='inputplanet'),
]