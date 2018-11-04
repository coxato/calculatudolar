from django.shortcuts import render
from django.http import HttpResponse
from bs4 import BeautifulSoup 
import requests as rq
import json

# Create your views here.

def AjaxSoup(request):
    textoParrafo = []
    arrLineasTexto = []
    limpio = []
    listo = []
    data = rq.get('https://twitter.com/monitordolarve')
    text = data.text
    soup = BeautifulSoup(text,'html.parser')
    parrafos = soup.select('.js-tweet-text-container')

    for pf in parrafos:
        textoParrafo.append(pf.getText())


    for txtPf in textoParrafo:
        arrLineasTexto.append(txtPf.split('\n'))


    for lineas in arrLineasTexto:
        if 'paralelo en Venezuela' in lineas[1]:
            limpio.append(
                {"moneda": lineas[1],
                "fecha": lineas[2],
                "tasa": lineas[4]})
    

    for i in range(len(limpio)):
        if 'Euro' in limpio[i]["moneda"]:
            listo.append({
                "euro":limpio[i]["tasa"],
                "fecha":limpio[i]["fecha"]
                })
            break

    for i in range(len(limpio)):
        if 'Dólar' in limpio[i]["moneda"]:
            listo.append({
                "dolar":limpio[i]["tasa"],
                "fecha":limpio[i]["fecha"]
                })
            break
    

    return HttpResponse(json.dumps(listo))


def Bcucuta(request):
    tasa = []
    elementos = []
    data = rq.get('https://twitter.com/bolivarcucuta')
    text = data.text
    soup = BeautifulSoup(text,'html.parser')
    contenido = soup.select('.js-tweet-text-container')

    for div in contenido:
        elementos.append(div.getText())

    for element in elementos:
        if 'DOLAR EN FRONTERA' in element:
            tasa.append(element)

    return HttpResponse(tasa)






