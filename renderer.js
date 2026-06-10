const codigo = document.getElementById('codigo');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const año = document.getElementById('año');
const precio = document.getElementById('precio');

const btnGuardar = document.getElementById('btnGuardar');
const btnLimpiar = document.getElementById('btnLimpiar');

const tablaInventario = document.getElementById('tablaInventario');

const totalInventario = document.getElementById('totalInventario');
const totalVehiculos = document.getElementById('cuentaVehiculos');

let sumaInventario = 0;
let valorInventario = 0
let cuentaVehiculos = 0;

let vehiculos = [];
let indiceEditar = null;

btnGuardar.addEventListener('click', function(){
    if(codigo.value === '' || marca.value === '' || modelo.value === '' || año.value === '' || precio.value === ''){
        alert('Por favor, complete todos los campos');
        return;
    }

    if(Number(precio.value) <= 0){
        alert('El precio no puede ser un valor menor o igual a 0');
        return;
    }

    if(Number(año.value) < 2000 || Number(año.value) > 2026){
        alert('Debe ingresar un año válido entre 2000 y el año actual');
        return;
    }

    let nuevoVehiculo = {
        codigo: codigo.value,
        marca: marca.value,
        modelo: modelo.value,
        año: Number(año.value),
        precio: Number(precio.value),
    };

    if(indiceEditar === null){ 
        vehiculos.push(nuevoVehiculo);     
    }else{
        vehiculos[indiceEditar] = nuevoVehiculo;
        indiceEditar = null; 
        btnGuardar.textContent = 'Guardar vehículo';
    }

    cuentaVehiculos++;
    totalVehiculos.textContent = cuentaVehiculos;

    mostrarVehiculos(); 

    valorInventario += sumaInventario;
    totalInventario.textContent = "L" + valorInventario.toFixed(2);
    
    limpiarFormulario(); 
});

btnLimpiar.addEventListener('click', limpiarFormulario);

function mostrarVehiculos() {
    tablaInventario.innerHTML = "";

    vehiculos.forEach(function(item, index){
        sumaInventario = item.precio;
        let fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${item.codigo}</td>
        <td>${item.marca}</td>
        <td>${item.modelo}</td>
        <td>${item.año}</td>
        <td>${item.precio.toFixed(2)}</td>
        <td>
            <button class="btnEditar" data-index="${index}">Editar</button>
            <button class="btnEliminar" data-index="${index}">Eliminar</button>
        </td>`;

        tablaInventario.appendChild(fila);
    });
}

tablaInventario.addEventListener('click', function(e) {
    if (e.target.classList.contains('btnEditar')) {
        const index = e.target.getAttribute('data-index');
        editarVehiculo(index);
    }
    if (e.target.classList.contains('btnEliminar')) {
        const index = e.target.getAttribute('data-index');
        eliminarVehiculo(index);
    }
});

function editarVehiculo(index) {
    let item = vehiculos[index];

    valorInventario = valorInventario - item.precio;

    codigo.value = item.codigo;
    marca.value = item.marca; 
    modelo.value = item.modelo; 
    año.value = item.año;
    precio.value = item.precio;

    valorInventario = valorInventario + item.precio;

    cuentaVehiculos--;
    totalVehiculos.textContent = cuentaVehiculos;
    totalInventario.textContent = valorInventario;

    indiceEditar = index;
    btnGuardar.textContent = "Actualizar vehículo";
}

function eliminarVehiculo(index) {
    let confirmar = confirm("¿Está seguro de eliminar este vehículo?");
    if(confirmar){
        vehiculos.splice(index, 1);

        cuentaVehiculos--;
        totalVehiculos.textContent = cuentaVehiculos;
        valorInventario = valorInventario - sumaInventario;
        totalInventario.textContent = "L" + valorInventario.toFixed(2);

        mostrarVehiculos();
        limpiarFormulario(); 
    }
}

function limpiarFormulario() {
    codigo.value = "";
    marca.value = "";
    modelo.value = "";
    año.value = "";
    precio.value = "";
    indiceEditar = null;
    btnGuardar.textContent = "Guardar vehículo";
}