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
        #print(fullData)
        A=fullData['A']
        #print(A)
        b=fullData['b']
        #print(b)
        c=fullData['c']
        #print(c)
        constEq=fullData['cEq']
        resEq=fullData['resEq']
        if len(constEq)==0:
            res = linprog(c, A_ub=A, b_ub=b,bounds=(0, None),method='simplex')
        else:
            res = linprog(c, A_ub=A, b_ub=b,A_eq=constEq,b_eq=resEq,bounds=(0, None),method='simplex')
            
        print('Optimal value:', res.fun, '\nX:', res.x)
        return json.dumps(fullData)
if __name__=='__main__':
    app.run(debug=True)