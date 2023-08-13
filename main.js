
const carrito = [];
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    actualizarCarrito();
}
function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.producto} $${item.precio} `;

        const quitarButton = document.createElement('button');
        quitarButton.textContent = 'Quitar';
        quitarButton.addEventListener('click', () => {
            quitarDelCarrito(index);
        });

        listItem.appendChild(quitarButton);
        carritoElement.appendChild(listItem);
        total += item.precio;
    });

    const totalItem = document.createElement('li');
    totalItem.textContent = `Total: $${total.toFixed(2)}`;
    carritoElement.appendChild(totalItem);

    const finalizarButton = document.createElement('button');
    finalizarButton.textContent = 'Finalizar compra';
    finalizarButton.addEventListener('click', () => {
        finalizarCompra(total);
    });

    carritoElement.appendChild(finalizarButton);
}

document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");

    botonesAgregarCarrito.forEach((boton) => {
        boton.addEventListener("click", function () {
            const producto = boton.getAttribute("data-producto");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            agregarAlCarrito(producto, precio);
        });
    });
});


function finalizarCompra(total) {
    if (carrito.length === 0) {
        Swal.fire({ icon: 'error',
        title: 'Atencíon!...',
        text: 'No hay productos agregados al carrito.',
        footer: '<a href="">Elegir Smartphone</a>'});
        
    } else {
        Swal.fire(`¡Gracias por tu compra! Total: $${total.toFixed(2)}`);

        carrito.length = 0;
        actualizarCarrito();
    }

    


}

const formulario = document.getElementById("formulario-contacto");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const mensajeInput = document.getElementById("mensaje");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const correo = correoInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    if (nombre === "" || correo === "" || mensaje === "") {
        Swal.fire("Por favor, completa todos los campos.");
        return;
    }
    
    const datosContacto = {
        id: new Date().getTime(), // Identificador único usando timestamp
        nombre: nombre,
        correo: correo,
        mensaje: mensaje,
    };

    const datosGuardados = localStorage.getItem("datosContacto");
    const datosPrevios = datosGuardados ? JSON.parse(datosGuardados) : [];

    // Verificar si ya existe un mensaje con el mismo contenido (evitar duplicados)
    const existeDuplicado = datosPrevios.some(previo =>
        previo.nombre === datosContacto.nombre &&
        previo.correo === datosContacto.correo &&
        previo.mensaje === datosContacto.mensaje
    );

    if (!existeDuplicado) {
        datosPrevios.push(datosContacto);
        localStorage.setItem("datosContacto", JSON.stringify(datosPrevios));
        limpiarFormulario();
        Swal.fire(
            "Mensaje enviado correctamente.");
        
    } else {
        Swal.fire("Este mensaje ya ha sido enviado anteriormente.");
    }
});

function limpiarFormulario() {
    nombreInput.value = "";
    correoInput.value = "";
    mensajeInput.value = "";
}












