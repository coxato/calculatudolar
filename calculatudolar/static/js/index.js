// variables globales ========******=========**********=========******
// ********variable para la eleccion si es dolarToday ó AirTM*********
let eleccion = 1
let orden = true;
let calculadorasDivs = [...document.querySelectorAll('.calc')];
let cambiarOrden = () => {
    orden = !orden
    if(eleccion == 1){calcularAirtm(cantidadAirtm.value)}
    else if(eleccion == 2){calcularToday(cantidadToday.value)}
    else if(eleccion == 3){calcularMonitor(cantidadMonitor.value)}
    else{calcularBcucuta(cantidadBcucuta.value)}
};
// ============== datos para usar ==============
let cambiosToday = [],
cambiosAirtm = [],
cambiosMonitorDolar = [],
cambiosBcucuta;


// mensaje de cargando
let mensajeCargandoToday = document.getElementById('mensajeCargandoToday');
let mensajeCargandoAirtm = document.getElementById('mensajeCargandoAirtm');
let mensajeCargandoMonitorDolar = document.getElementById('mensajeCargandoMonitorDolar');
let mensajeCargandoBcucuta = document.getElementById('mensajeCargandoBcucuta');

// contenedor <div>  para la ayuda del usuario con airtm
let descripcionAirtm = document.getElementById('ayuda_descriptiva');

// fechas 
let meses = new Array("Enero", "Febrero", "Marzo", "Abril","Mayo",
"Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
const mostrarFecha = () => {
let tiempo = new Date()
let horas = tiempo.getHours();
let minutos = tiempo.getMinutes()
document.getElementById('fecha').innerHTML = `
<h2>${tiempo.getDate()} de ${meses[tiempo.getMonth()]} del ${tiempo.getFullYear()}</h2>
<h2>${horas % 12 || 12}:${minutos < 6 ? '0'+minutos: minutos} ${horas < 12 ? 'A':'P'}M</h2>
`
}
mostrarFecha();

// actualizar tasas y fechas manualmente con el boton 'actualizar'
const actualizar = () => {
    traerDataAirtm();
    traerDataToday();
    traerDataMonitor();
    traerDataBcucuta();
    mostrarFecha();
}

// ===***===*** fin de las variables globales ===***===***===***===***===***


// si se hace onchange se calcula de una vez
function calcularOnchangeToday(){
    calcularToday(cantidadToday.value);
}
function calcularOnchangeAirtm(){
    calcularAirtm(cantidadAirtm.value);
}
function calcularOnchangeMonitor(){
    calcularMonitor(cantidadMonitor.value);
}

// ======******===========************=============************======

// quitar y poner clase css
function cambiar_calculadoras(index){
    let seccionCalculadoras = document.querySelector('.contenedor_calculadoras');
   
    let colors = ['green','#4a91de','rgb(248, 92, 35)','#ffdd27'];
    for(let i = 0; i < calculadorasDivs.length;i++){
        if(calculadorasDivs[i].className.includes('active')){
            calculadorasDivs[i].className = calculadorasDivs[i].className.replace('active','');
        }
    }
    calculadorasDivs[index].className += ' active';
    seccionCalculadoras.style.backgroundColor = colors[index];
    
}

function seleccionPrincipal(value,index){
    // siempre se inicia la descripcion de airtm en vacio
    descripcionAirtm.innerHTML = '';

    if(value === 'btnAirtm'){
    cambiar_calculadoras(index);
    eleccion = 1
}
    else if(value === 'btnToday'){
        cambiar_calculadoras(index);
        eleccion = 2
    }
    else if(value === 'btnMonitor'){
        cambiar_calculadoras(index);
        eleccion = 3
    }
    else{
        cambiar_calculadoras(index);
        eleccion = 4
    }
}

// =========================  obtener cantidad =========================
//1
let cantidadToday = document.getElementById('cantidadToday');
cantidadToday.addEventListener('keyup',obtenerCantidadToday);
//2
let cantidadAirtm = document.getElementById('cantidadAirtm');
cantidadAirtm.addEventListener('keyup',obtenerCantidadAirtm);
//3
let cantidadMonitor = document.getElementById('cantidadMonitor');
cantidadMonitor.addEventListener('keyup',obtenerCantidadMonitor);
//4
let cantidadBcucuta = document.getElementById('cantidadBcucuta');
cantidadBcucuta.addEventListener('keyup',obtenerCantidadBcucuta);
//contenedor del resultado
let muestraContainer = document.getElementById('mostrando');

function obtenerCantidadToday(){
        calcularToday(this.value)
}
function obtenerCantidadAirtm(){
    calcularAirtm(this.value);
}
function obtenerCantidadMonitor(){
    calcularMonitor(this.value);
}
function obtenerCantidadBcucuta(){
    calcularBcucuta(this.value);
}

// ================= calcular dolar Today===================
function formulaNormal(cifra,cambio){
    if(orden){//de usd$ a BS.s
        return cifra * cambio;
    }else{//de BS.s a usd$
        return cifra / cambio;
    }
}
function calcularToday(numeros){
let cambioUSDToday = cambiosToday[0].usdToday;
let cambioUSDEfectivo = cambiosToday[4].dolarEfectivo;
let cambioUSDSicad1 = cambiosToday[2].dolarSicad1;
let cambioUSDSicad2 = cambiosToday[3].dolarSicad2;
let cambioEURToday = cambiosToday[1].eurToday;
let cambioEUREfectivo = cambiosToday[7].eurEfectivo;
let cambioEURSicad1 = cambiosToday[5].eurSicad1;
let cambioEURSicad2 = cambiosToday[6].eurSicad2;
    let cifra = parseFloat(numeros);
    let resultado;
    let divisa = '';
    let opcion = document.getElementById('select1').value;
    let opcion2 = document.getElementById('select2Today').value;
    if(opcion === 'dolar'){
        switch(opcion2){
            case 'dolartoday': resultado = formulaNormal(cifra,cambioUSDToday); break;
            case 'efectivo': resultado = formulaNormal(cifra,cambioUSDEfectivo);break;
            case 'sicad1': resultado = formulaNormal(cifra,cambioUSDSicad1);break;
            case 'sicad2': resultado = formulaNormal(cifra,cambioUSDSicad2);break;
        }
        divisa = '$';
    }else{  // si son euros lo que se quiere cambiar
        switch(opcion2){
            case 'dolartoday': resultado = formulaNormal(cifra,cambioEURToday); break;
            case 'efectivo': resultado = formulaNormal(cifra,cambioEUREfectivo);break;
            case 'sicad1': resultado = formulaNormal(cifra,cambioEURSicad1);break;
            case 'sicad2': resultado = formulaNormal(cifra,cambioEURSicad2);break;
        }
        divisa = '€';
        
    }
    
    separarCifraYResultado(cifra,resultado,divisa)
}
// ================= calcular AirTM ===================
function formulaAirtm(opcion,cifra,cambio){
 const comision = 0.30;

    // esta función retorna el calculo y el cambio con el que se
    // está trabajando
    if(opcion === 'vender'){
     if(orden){
        return [(cifra - comision) * cambio, cambio];
     }else{
        return [cifra / cambio + comision, cambio];
     }
 }else{//si se quiere comprar
    if(orden){
        return [(cifra + comision) * cambio, cambio];
    }else{
        return [cifra / cambio - comision, cambio];
    }
 }
}
function calcularAirtm(numeros){

    let cifra = parseFloat(numeros);
    let resultado;
    const divisa = '$';
    let opcion = document.getElementById('select2').value;
    let opcion2 = document.getElementById('select2Airtm').value;
    if(opcion === 'vender'){
        switch(opcion2){
            case 'banco': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[0].venta);break;
            case 'mercado': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[1].venta);break;
            case 'money': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[2].venta);break;
            case 'union': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[3].venta);break;
        }
    }
    else{  // si se quiere comprar
        switch(opcion2){
            case 'banco': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[0].compra);break;
            case 'mercado': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[1].compra);break;
            case 'money': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[2].compra);break;
            case 'union': resultado = formulaAirtm(opcion,cifra,cambiosAirtm[3].compra);break;
        } 
    }                                             
    // ayuda al usuario con descripcion del calculo 
                                        //para pasar el cambio 
    ayudaAirtm(cifra,resultado[0],opcion,resultado[1])
}

// calcular MonitorDolar ===================
function calcularMonitor(numeros){
    let cifra = parseFloat(numeros);
    let divisa = '';
    let value = document.getElementById('select_monitor').value;
    let resultado;
    if(value === 'dolar'){
        divisa = '$'
        resultado = formulaNormal(cifra,cambiosMonitorDolar.dolar);
    }else{
        divisa = '€'
        resultado = formulaNormal(cifra,cambiosMonitorDolar.euro);
    }
    separarCifraYResultado(cifra,resultado,divisa)

}

// calcular Bcucuta
function calcularBcucuta(numeros){
    let cifra = parseFloat(numeros);
    let divisa = '$';
    let resultado = formulaNormal(cifra,cambiosBcucuta)
    separarCifraYResultado(cifra,resultado,divisa);

}


    // separar el monto y los resultados por comas llamando
    // a la funcion separar por comas
function separarCifraYResultado(cifra,resultado,divisa){
    let cifraConComas = separarPorComas(cifra);
    let resultadoConComas = separarPorComas(resultado);
        //AQUI SE MANDA A PINTAR
        dibujarCantidades(cifraConComas,resultadoConComas,divisa)
}


function ayudaAirtm(cifra,resultado,opcion,cambio){
    let cifraConComas = separarPorComas(cifra);
    let resultadoConComas = separarPorComas(resultado);
    dibujarCantidades(cifraConComas,resultadoConComas,'$')
    let cambioSinComision;
    let mensaje;
    // como cifra viene en string, se separa por los puntos de miles
    // se une, y se remplaza la coma de los decimales por un punto
    // para poder usar el parseFloat 
    let cantidad = cifraConComas.split('.').join('').replace(',','.')

    if(orden){
        mensaje = `
        <p>
        <b>si ${opcion === 'vender' ? 'vendes':'quieres comprar'}</b>
        ${cifraConComas}$ AirTM,
        <b>${opcion==='vender'? 'optendrás':'necesitas'}</b>
        ${resultadoConComas} BS.s
        </p>`
        cambioSinComision = parseFloat(cambio) * parseFloat(cantidad);
    }
    else{
        mensaje = `
        <p>
        <b>${opcion === 'vender' ? 'si quieres tener':'con'}</b>
        ${cifraConComas} bolívares, 
        <b>${opcion==='vender'? 'necesitas tener':'te puedes comprar'}</b>
        ${resultadoConComas} $ en AirTM
        </p>`
        cambioSinComision = parseFloat(cantidad) / parseFloat(cambio);
    }
    
    descripcionAirtm.innerHTML = `
    <ul>
        <li>tasa del dia: 1AirUSD = <b>${cambio} Bs.S</b> </>
        <li>cambio sin comisión: <b>${cambioSinComision.toFixed(2)}</b></li>
        <li>comision AirTM: <b>0.30$</b></li>
    </ul>
    <br>
    ${mensaje}

    `
}

// ====== separar las cantidades por comas para hacerlas más legibles =====
function separarPorComas(calculo){
    let cantidad = parseFloat(calculo),
    
    decimales = cantidad.toFixed(2),
    separados = decimales.split('.'),
    // enteros = los enteros a separar por comas
    enteros = [...separados[0]].reverse();

    let salida = [];//donde se iran guardando los valores ya separados
    let aux = '';// guarda en string de 3 en 3 cifras  
    //determinar cuantas secciones hay, ej: "26123987" == 3 secciones
    let secciones = Math.ceil(enteros.length / 3);

    for(let i = 0; i < secciones ;i++){
        for(let j = 0; j < 3; j++){
            if(enteros[j + (i * 3)] != undefined){
                aux += enteros[j + (i * 3)]
            }
        }
        salida.push(aux);
        aux = '';

    }
    let separarArr = salida.map(el => [...el]);
    let volteado = separarArr.map(el => el.reverse());
    let juntos = volteado.map(el => el.join(''));
    
    let finalizado = juntos.reverse().join('.');
    
    return finalizado.concat(',',separados[1]);
        
}

// ================ dibujar elementos =====================

function dibujarCantidades(cifra,resultado,divisa){
    let simbolos;
    orden ? simbolos = [divisa,'Bs.S'] : simbolos = ['Bs.S',divisa]; 
    muestraContainer.innerHTML = `
    <div class="contenedor_resultado">
    <h1 class="resultado">${simbolos[0]} ${cifra} = ${simbolos[1]} ${resultado}</h1>
    <a class="cambiar_orden" onclick="cambiarOrden()">
        <p>Invertir el orden</p>
        <img src="../static/img/flechas.svg" id="flechas">
    </a>
    </div>
    `
}

// ==================función para traer data de dolartoday==================
async function traerDataToday(){
    try {
        // https://s3.amazonaws.com/dolartoday/data.json
    const data = await fetch('https://s3.amazonaws.com/dolartoday/data.json')
    const json = await data.json()
    cambiosToday = []
    cambiosToday.push({usdToday: json.USD.dolartoday})//usd dolartoday
    cambiosToday.push({eurToday: json.EUR.dolartoday})//euro dolartoday
    cambiosToday.push({dolarSicad1: json.USD.sicad1})//dolar sicad1
    cambiosToday.push({dolarSicad2: json.USD.sicad2})//dolar sicad2
    cambiosToday.push({dolarEfectivo: json.USD.efectivo_cucuta})//$efectivo_cucuta
    cambiosToday.push({eurSicad1: json.EUR.sicad1})//euro sicad1
    cambiosToday.push({eurSicad2: json.EUR.sicad2})//euro sicad2
    cambiosToday.push({eurEfectivo: json.EUR.efectivo_cucuta})//E-efectivo_cucuta
    mensajeCargandoToday.innerHTML = '';
    dibujarTasasToday(cambiosToday)
    
    } catch (err) {
        manejoDeError(err,'dolatoday')
    }
}
// ==================función para traer data de Airtm==================

function traerDataAirtm(){
    
        // https://airtmrates.com/rates
        fetch('https://airtmrates.com/rates')
        .then(data => data.text())
        .then(todoElTexto => todoElTexto.split('\n'))
        .then(textoProcesado => {
            cambiosAirtm = [];
            mensajeCargandoAirtm.innerHTML = '';
            let  elementos = textoProcesado.map(el => el.split(','))
            for(const i of elementos){
                if(i[0] === 'VES'){
                    cambiosAirtm.push({metodoDeCambio: i[2],compra: i[5],venta: i[6]})
                }
            }
            dibujarTasasAirtm(cambiosAirtm);
        })
        .catch( err => manejoDeError(err,'AirTM'))
        
}
// ========traer data de monitorDolar=======
function traerDataMonitor(){
    fetch(urlSoup)//urlSoup esta definida en index.html
    .then(response => response.json())
    .then(jsonArr => {
        cambiosMonitorDolar = [];
        cambiosMonitorDolar = jsonArr
        mensajeCargandoMonitorDolar.textContent = '';
        dibujarTasasMonitor(cambiosMonitorDolar)
         
    })
    .catch(err => manejoDeError(err,'monitorDolarVe'))
}
// traer datos de bolivar cucuta
function traerDataBcucuta(){
    fetch(urlBcucuta)
    .then(response => response.text())
    .then(txt => {
        cambiosBcucuta = '';
        let arr = txt.split('hoy')
        arr.splice(0,1)
        let lineas = arr[0].split('\n')
        let separado = [],
        tasaBcucuta;
        for(const i of lineas){
            if(i != ''){
                separado.push(i)
            }
        }
        tasaBcucuta = separado[2].split(' ')
        tasaBcucuta = parseFloat(tasaBcucuta[0].replace(',','.'))
        cambiosBcucuta = tasaBcucuta;
        mensajeCargandoBcucuta.textContent = '';

        dibujarTasaBcucuta(cambiosBcucuta);
    })
}


// ===================== manejo de error =====================
function manejoDeError(err,casaDeCambios){
    setTimeout( () => {
        alert(`lo siento :(  pero no se han podido cargar los datos
        de ${casaDeCambios}.
puede que sea tu conexión a internet ó un error en los servidores de ${casaDeCambios}
        error:
        ${err}`)
    },3000)
}



// ================ dibujar las tasas al principio de la página ============
function dibujarTasasToday(cambiosToday){
    //valores en orden 1ro dolartoday luego airtm;
    let valoresEnOrdenToday = [
        cambiosToday[1].eurToday,cambiosToday[0].usdToday,
        cambiosToday[7].eurEfectivo,cambiosToday[4].dolarEfectivo,
        cambiosToday[5].eurSicad1,cambiosToday[2].dolarSicad1,
        cambiosToday[6].eurSicad2,cambiosToday[3].dolarSicad2,
    ]

    let cuadros = document.querySelectorAll('.tasaToday');
    cuadros = [...cuadros]

    for(let i = 0; i< cuadros.length ; i++){
        cuadros[i].textContent = valoresEnOrdenToday[i]
    }

}

function dibujarTasasAirtm(cambiosAirtm){
    //valores en orden 1ro dolartoday luego airtm;
    let valoresEnOrdenAirtm = [
        cambiosAirtm[0].compra,cambiosAirtm[0].venta,
        cambiosAirtm[1].compra,cambiosAirtm[1].venta,
        cambiosAirtm[2].compra,cambiosAirtm[2].venta,
        cambiosAirtm[3].compra,cambiosAirtm[3].venta,
    ]

    let cuadros = document.querySelectorAll('.tasaAirtm');
    cuadros = [...cuadros]

    for(let i = 0; i< cuadros.length ; i++){
        cuadros[i].textContent = valoresEnOrdenAirtm[i]
    }

}
function dibujarTasasMonitor(tasasMonitor){

    let separarTasa = [
        tasasMonitor[0].euro.split('='),
        tasasMonitor[1].dolar.split('=')];

    let separarFecha = [
        tasasMonitor[0].fecha.split('las'),
        tasasMonitor[1].fecha.split('las')
    ]
    let fechas = [separarFecha[0][1],separarFecha[1][1]]

    let valores = [separarTasa[0][1],separarTasa[1][1]]

    let cuadrosFechas = [...document.querySelectorAll('.fechaMonitor')];
    let cuadros = [...document.querySelectorAll('.tasaMonitor')];
    for(let i = 0; i < cuadros.length;i++){
        cuadros[i].textContent = valores[i];
        cuadrosFechas[i].textContent = fechas[i];
    }
    // guardar la tasa numerica luego de pintar
    cambiosMonitorDolar = {
        'euro': parseFloat(separarTasa[0][1].split('BsS')),
        'dolar': parseFloat(separarTasa[1][1].split('BsS'))
    }
}

function dibujarTasaBcucuta(tasa){
    document.getElementById('tasaBcucuta').innerHTML = `
    <p id="tBcucuta">${tasa} Bs.S</p>
    `
}

traerDataToday();
traerDataAirtm();
traerDataMonitor();
traerDataBcucuta();