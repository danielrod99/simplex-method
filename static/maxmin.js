

var app = angular.module('maxmin', []);
app.controller('max-minCtrl', function ($scope,$http) {
    $scope.restricciones = [];
    $scope.maxomin = 'Maximizar';
    $scope.numRestricciones = 'select';
    $scope.todosValidos = [];
    $scope.numFuncionObj='select';
    $scope.formaCanonica=[]
    $scope.nuevo=false;
    $scope.showGraph=false;
    $scope.otro=false;
    $scope.llenarFuncionObjetivo=function(){
        $scope.formaCanonica=[]
        for(let i=0;i<parseInt($scope.numFuncionObj);i++){
            $scope.formaCanonica.push({valor:0,x:('X'+(i+1))})
        }
    }
    $scope.llenarRestricciones = function () {
        $scope.showGraph=false;
        $scope.restricciones = [];
        var numero=parseInt($scope.numRestricciones);
        for (let i = 0; i < numero; i++) {
            $scope.restricciones.push({
                x1: 0,
                x2: 0,
                igualador: '<=',
                resultado: 0,
            });
        }
    }    
    $scope.calcular=function(){
        if($scope.revisarValores()=='error'){
            alert('Algun valor en las restricciones no es un numero');
            return
        }
        var fullBody={
            "maxomin": $scope.maxomin,
            "canonica": $scope.formaCanonica,
            "restricciones": $scope.restricciones
        }
        console.log(fullBody)
       // $scope.$apply();
        // $http.post('/calcular',JSON.stringify(fullBody)).then((result)=>{
        //     console.log(result)
        //     if(typeof(result.data)=='string'){
        //         alert('Hay una indeterminacion');
        //         window.location.reload();
        //     }else{
        //         $scope.resFunObj=result.data.resFunObj;
        //         $scope.puntos=result.data.puntos;
        //     }
        // })
        
    }
    $scope.ajustarEstilos=function(){
        var divImg= document.getElementById('img');
        var dataDiv= document.querySelector('.puntosResp');
        var resultDiv=document.querySelector('.funcObj');
        var puntos= document.querySelector('.puntos');
        divImg.style.float='left';
        dataDiv.style.float='left';
        resultDiv.style.float='left';
        puntos.style.float='left';

        divImg.style.width='50%';
        dataDiv.style.width='50%';
        resultDiv.style.width='50%';
        puntos.style.width='50%';
    }
    $scope.reloading=function(){
        window.location.reload();
    }
    $scope.revisarValores=function(){
        var hayError=false;
        $scope.restricciones.forEach((item,index)=>{
            if(isNaN(item.x1)==true){
                hayError=true;
                return 'error'
            }
            if(isNaN(item.x2)==true){
                hayError=true;
                return 'error'
            }
            if(isNaN(item.resultado)==true){
                hayError=true;
                return 'error'
            }

        })
        if(hayError){
            return 'error'
        }else{
            return 'ok'
        }
    }
    $scope.corregir=function(){
        try{
            localStorage.setItem('restricciones',JSON.stringify($scope.restricciones));
            localStorage.setItem('formaCanonica',JSON.stringify($scope.formaCanonica));
            localStorage.setItem('maxomin',$scope.maxomin);
            localStorage.setItem('corregir','si');
            window.location.reload();
        }catch(err){
            alert('No se pudo guardar');
        }
    }
    $scope.revisarSiCorrige=function(){
        var corrige=localStorage.getItem('corregir');
        if(corrige=='si'){
            try{
                localStorage.setItem('corregir','no');
                $scope.restricciones=JSON.parse(localStorage.getItem('restricciones'));
                $scope.formaCanonica=JSON.parse(localStorage.getItem('formaCanonica'));
                $scope.maxomin=localStorage.getItem('maxomin');
                $scope.numRestricciones=$scope.restricciones.length
            }catch(err){
                alert('No se pudo obtener datos')
            }
            
        }
    }
});

