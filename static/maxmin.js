

var app = angular.module('maxmin', []);
app.controller('max-minCtrl', function ($scope, $http) {
    $scope.restricciones = [];
    $scope.maxomin = 'Maximizar';
    $scope.numRestricciones = 'select';
    $scope.todosValidos = [];
    $scope.numFuncionObj = 'select';
    $scope.fObjetivo = []
    $scope.nuevo = false;
    $scope.showGraph = false;
    $scope.otro = false;
    $scope.llenarFuncionObjetivo = function () {
        $scope.fObjetivo = []
        for (let i = 0; i < parseInt($scope.numFuncionObj); i++) {
            $scope.fObjetivo.push({ valor: 0, x: ('X' + (i + 1)) })
        }
    }
    $scope.llenarRestricciones = function () {
        $scope.showGraph = false;
        $scope.restricciones = [];
        var numero = parseInt($scope.numRestricciones);
        for (let i = 0; i < numero; i++) {
            var numX = [];
            for (let j = 0; j < parseInt($scope.numFuncionObj); j++) {
                numX.push({ valor: 0, x: ('X' + (j + 1)) })
            }
            $scope.restricciones.push({
                constantes: numX,
                igualador: '<=',
                resultado: 0,
            });
        }
        console.log($scope.restricciones);
        var objetos = document.querySelector('.objetos');
        var content = '';
        for (let i = 0; i < $scope.restricciones.length; i++) {
            for (let j = 0; j < $scope.restricciones[i].constantes.length; j++) {
                content += `<input class="numInput" id="restriccion${i}Constante${j}" type="number" step="any"><label for="">${$scope.restricciones[i].constantes[j].x}+</label>`
            }
            content += `<select name="" id="igualador${i}">
            <option value=">=">>=</option>
            <option value="<="><=</option>
            <option value="=">=</option>
          </select>
          <input id="resultado${i}" class="numInput" type="number" step="any"> <br>`
        }
        //console.log(content)
        objetos.innerHTML = content;
    }
    $scope.calcular = function () {
        for (let i = 0; i < $scope.restricciones.length; i++) {
            for (let j = 0; j < $scope.restricciones[i].constantes.length; j++) {
                $scope.restricciones[i].constantes[j].valor = document.getElementById(`restriccion${i}Constante${j}`).value;
            }
            $scope.restricciones[i].igualador = document.getElementById(`igualador${i}`).value;
            $scope.restricciones[i].resultado = document.getElementById(`resultado${i}`).value;
        }
        for(let i=0;i<$scope.restricciones.length;i++){
            for (let j = 0; j < $scope.restricciones[i].constantes.length; j++) {
                $scope.restricciones[i].constantes[j].valor=parseFloat($scope.restricciones[i].constantes[j].valor)         
            }
            $scope.restricciones[i].resultado=parseFloat($scope.restricciones[i].resultado)
        }
        for(let i=0;i<$scope.restricciones.length;i++){
            for (let j = 0; j < $scope.restricciones[i].constantes.length; j++) {
                if(isNaN($scope.restricciones[i].constantes[j].valor)==true){
                    alert('Algun valor en las restricciones no es un numero');
                    return
                }        
            }
            if(isNaN($scope.restricciones[i].resultado)==true){
                alert('Algun valor en las restricciones no es un numero');
                return
            }
        }
        var fullBody = {
            "maxomin": $scope.maxomin,
            "canonica": $scope.fObjetivo,
            "restricciones": $scope.restricciones
        }
        console.log(fullBody)
        var c = [];
        for (let i = 0; i < fullBody.canonica.length; i++) {
            c.push(fullBody.canonica[i].valor);
        }
        var A = [];
        var constEq=[]
        for (let i = 0; i < fullBody.restricciones.length; i++) {
            var oneRestriccion=[];
            var oneEqRes=[];
            for (let j = 0; j < fullBody.restricciones[i].constantes.length; j++) {        
                if(fullBody.restricciones[i].igualador=='>='){
                    oneRestriccion.push(fullBody.restricciones[i].constantes[j].valor*-1);
                }else if (fullBody.restricciones[i].igualador=='<='){
                    oneRestriccion.push(fullBody.restricciones[i].constantes[j].valor);
                }else if(fullBody.restricciones[i].igualador=='='){
                    oneEqRes.push(fullBody.restricciones[i].constantes[j].valor)
                }
            }
            if(oneRestriccion.length>0){
                A.push(oneRestriccion);
            }
            if(oneEqRes.length>0){
                constEq.push(oneEqRes);
            }
        }
        var b=[];
        var resEq=[];
        for (let i = 0; i < fullBody.restricciones.length; i++){
            if(fullBody.restricciones[i].igualador=='>='){
                b.push(fullBody.restricciones[i].resultado*-1);
            }else if(fullBody.restricciones[i].igualador=='<='){
                b.push(fullBody.restricciones[i].resultado);
            }else if(fullBody.restricciones[i].igualador=='='){
                resEq.push(fullBody.restricciones[i].resultado);
            }
        }
        var newBody={
            A:A,
            b:b,
            c:c,
            cEq:constEq,
            resEq:resEq
        }
        console.log(newBody);
        // $scope.$apply();
        $http.post('/calcular',JSON.stringify(newBody)).then((result)=>{
            console.log(result)
            
        })

    }
    $scope.ajustarEstilos = function () {
        var divImg = document.getElementById('img');
        var dataDiv = document.querySelector('.puntosResp');
        var resultDiv = document.querySelector('.funcObj');
        var puntos = document.querySelector('.puntos');
        divImg.style.float = 'left';
        dataDiv.style.float = 'left';
        resultDiv.style.float = 'left';
        puntos.style.float = 'left';

        divImg.style.width = '50%';
        dataDiv.style.width = '50%';
        resultDiv.style.width = '50%';
        puntos.style.width = '50%';
    }
    $scope.reloading = function () {
        window.location.reload();
    }
    $scope.revisarValores = function () {
        var hayError = false;
        $scope.restricciones.forEach((item, index) => {
            if (isNaN(item.x1) == true) {
                hayError = true;
                return 'error'
            }
            if (isNaN(item.x2) == true) {
                hayError = true;
                return 'error'
            }
            if (isNaN(item.resultado) == true) {
                hayError = true;
                return 'error'
            }

        })
        if (hayError) {
            return 'error'
        } else {
            return 'ok'
        }
    }
    $scope.corregir = function () {
        try {
            localStorage.setItem('restricciones', JSON.stringify($scope.restricciones));
            localStorage.setItem('fObjetivo', JSON.stringify($scope.fObjetivo));
            localStorage.setItem('maxomin', $scope.maxomin);
            localStorage.setItem('corregir', 'si');
            window.location.reload();
        } catch (err) {
            alert('No se pudo guardar');
        }
    }
    $scope.revisarSiCorrige = function () {
        var corrige = localStorage.getItem('corregir');
        if (corrige == 'si') {
            try {
                localStorage.setItem('corregir', 'no');
                $scope.restricciones = JSON.parse(localStorage.getItem('restricciones'));
                $scope.fObjetivo = JSON.parse(localStorage.getItem('fObjetivo'));
                $scope.maxomin = localStorage.getItem('maxomin');
                $scope.numRestricciones = $scope.restricciones.length
            } catch (err) {
                alert('No se pudo obtener datos')
            }

        }
    }
});

