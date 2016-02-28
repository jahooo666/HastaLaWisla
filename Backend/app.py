#!/usr/bin/env python
# -*- coding: utf-8 -

import json

from wsgiref import simple_server

from flask import Flask

app_url = ''
app = Flask(__name__)
app.debug = True

photos_path = './photos/'

class Miejsce:
	def __init__(self, identyfikator, nazwa,long, lat,kategoria, opis,zdjecie_main,zdj1,zdj2,zdj3,cena, otwarcie, zamkniecie):
		self.identyfikator = identyfikator
		self.nazwa = nazwa					 #bez enterow!!!
		self.longitude = long
		self.latitude = lat
		self.kategoria = kategoria		 	#string {natura, ruch, gastronomia, muzyka}
		self.opis = opis
		self.otwarcie = otwarcie
		self.zamkniecie = zamkniecie
		self.zdjecie_main = zdjecie_main	#wszystkie zdjecia to tak naprawde sciezki z /img/
		self.zdj1 = zdj1
		self.zdj2 = zdj2
		self.zdj3 = zdj3

	def get_places(self):
		obj = {}
		obj['identyfikator'] = self.identyfikator
		obj['nazwa'] = self.nazwa
		obj['kategoria'] = self.kategoria
		obj['opis'] = self.opis
		obj['longitue'] = self.longitude
		obj['latitude'] = self.latitude
		obj['zdjecie_main'] = photos_path + self.nazwa + '/' + self.zdjecie_main
		obj['zdj1'] = photos_path + self.nazwa + '/' + self.zdj1
		obj['zdj2'] = photos_path + self.nazwa + '/' + self.zdj2
		obj['zdj3'] = photos_path + self.nazwa + '/' + self.zdj3
		obj['cena'] = self.cena
		obj['otwarcie'] = self.otwarcie
		obj['zamkniecie'] = self.zamkniecie

		return json.dumps(obj)

Warszawa = Miejsce('0', 'Warszawa', '52:21', 'zdjecie.jpg', 'Miasto', 'NaszeMiasto', '')
Cypel = Miejsce('sdu73f', 'Cypel', '52:21', 'zdjecie.jpg', 'picie', 'Troche nieleglane miejsce...', '')

@app.route(app_url + '/places/warszawa')
def wawa():
	return Warszawa.get_places()

@app.route(app_url + '/places/cypel')
def cypel():
	return Cypel.get_places()



if __name__ == '__main__':
    httpd = simple_server.make_server('127.0.0.1', 5000, app)
    httpd.serve_forever()
