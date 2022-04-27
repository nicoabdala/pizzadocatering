const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
    let sliderSectionFirst = document.querySelectorAll(".slider-section") [0]
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeEnd', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

function Prev() {
    let sliderSection = document.querySelectorAll(".slider-section");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
}

btnRight.addEventListener('click', function() {
    Next();
})

btnLeft.addEventListener('click', function() {
    Prev();
})

setInterval(function() {
    Next();
}, 10000);


/* MENU */ 

let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');

btnMenu.addEventListener('click', function() {
    mainNav.classList.toggle('mostrar');
});



/* CARRITO */ 

const carrito = document.getElementById('carrito');
const menu = document.getElementById('morfi');
const listaMenu = document.querySelector('#list-carrito tbody');
const vaciarCarritoBtn = document.getElementById('empty-carrito');

cargarEventListeners();

function cargarEventListeners() {
    menu.addEventListener('click', comprarMenu);
    carrito.addEventListener('click', eliminarMenu);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

/* Añadir al Carrito */ 

function comprarMenu(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-carrito')) {
        const pizzas = e.target.parentElement.parentElement;
        leerDatosMenu(menu);
    }
}

/* Leer Datos Menu */

function leerDatosMenu(pizzas) {
    const infoMenu = {
        imagen:pizzas.querySelector('img').src,
        titulo:pizzas.querySelector('h3').textContent,
        precio:pizzas.querySelector('.product-price span').textContent,
        id:pizzas.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoMenu);
}

/* Mostrar producto en Carrito */ 

function insertarCarrito(pizzas) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${pizzas.imagen}" width=100> 
    </td>
    <td>${pizzas.titulo}</td>
    <td>${pizzas.precio}</td>
    <td>
        <a href="#" class="borrar-pizzas" data-id="${pizzas.id}">X</a>
    </td>
    `;

    listaMenu.appendChild(row);
    guardarPizzasLocalStorage(pizzas);
}

/* Eliminar producto del Carrito */ 

function eliminarMenu(e) {
    e.preventDefault();

    let pizzas, 
        pizzasID;

    if (e.target.classList.contains('borrar-pizzas')) {
        e.target.parentElement.parentElement.remove();
        pizzas = e.target.parentElement.parentElement;
        pizzasID = pizzas.querySelector('a').getAttribute('data-id');
    }

    eliminarMenuLocalStorage(pizzasID);
}

/* Eliminar productos todos juntos del carrito */ 

function vaciarCarrito() {
    while (listaMenu.firstChild) {
        listaMenu.removeChild(listaMenu.firstChild);
    }

    vaciarLocalStorage();
    return false;
}

/* guardar menu en LS */ 

function guardarMenuLocalStorage(pizzas) {
    let menu; 
    menu = obtenerMenuLocalStorage();
    menu.push(pizzas);

    localStorage.setItem('menu', JSON.stringify(menu));
}

/* --- */ 

function obtenerMenuLocalStorage() {
    let menuLS;

    if (localStorage.getItem('menu') === null) {
        menuLS = [];
    } else {
        menuLS = JSON.parse(localStorage.getItem('menu'));
    }

    return menuLS;
}

/* imprimir las pizzas de LS en el carrito */ 

function leerLocalStorage() {
    let menuLS;
    menuLS = obtenerMenuLocalStorage();

    menuLS.forEach(function(pizzas) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${pizzas.imagen}" width="100">
            </td>
            <td>${pizzas.titulo}</td>
            <td>${pizzas.precio}</td>
            <td>
                <a href="#" class="borrar-pizzas" data-id="${pizzas.id}">X</a>
            </td>
        `;
        listaMenu.appendChild(row);
    })
}

/* eliminar pizzas por ID en LS */ 

function eliminarMenuLocalStorage(pizzas) {
    let menuLS;
    menuLS = obtenerMenuLocalStorage();

    menuLS.forEach(function(pizzasLS, index) {
        if (pizzasLS.id === pizzas) {
            menuLS.splice(index, 1);
        }
    });

    localStorage.setItem('menu', JSON.stringify(menuLS));
}

/* ---- */ 

function vaciarLocalStorage() {
    localStorage.clear();
}

