from flask import Flask, redirect, url_for, render_template, request
import numpy as np
from scipy.optimize import linprog
import json
import os
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/informacion')
def informacion():
    return "<h1>Hola</h1>"
@app.route('/calcular', methods=['GET','POST'])
def calcular():
    if request.method== 'POST':
        fullData=request.get_json()
        return json.dumps(fullData)
if __name__=='__main__':
    app.run(debug=True)