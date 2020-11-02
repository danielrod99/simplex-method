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
        print(fullData)
        
        fullArray=[]
        for x in range(len(fullData['A'])):
            array=[]
            for y in range(len(fullData['A'][x])):
                array.append(fullData['A'][x][y])
            fullArray.append(array)

        A=fullArray
        print(A)
        arrayb=[]
        for x in range(len(fullData['b'])):
            arrayb.append(fullData['b'][x])
        b=arrayb
        print(b)
        arrayc=[]
        for x in range(len(fullData['c'])):
            arrayc.append(fullData['c'][x])
        c=arrayc
        print(c)
        res = linprog(c, A_ub=A, b_ub=b,bounds=(0, None))
        print('Optimal value:', res.fun, '\nX:', res.x)
        return json.dumps(fullData)
if __name__=='__main__':
    app.run(debug=True)