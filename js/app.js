const productos = [
    {
        id: 1,
        nombre: "Bombillo LED 12W (Pack x4)",
        categoria: "iluminacion",
        precio: 45000,
        ahorro: "Ahorra hasta 85% vs incandescente",
        imagen: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        nombre: "Regleta Inteligente Wi-Fi",
        categoria: "automatizacion",
        precio: 98000,
        ahorro: "Elimina consumos fantasma en standby",
        imagen: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        nombre: "Medidor de Consumo Energético Plug-in",
        categoria: "medidores",
        precio: 65000,
        ahorro: "Identifica qué electrodoméstico gasta más",
        imagen: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        nombre: "Termostato Inteligente para Aire Acondicionado",
        categoria: "climatizacion",
        precio: 220000,
        ahorro: "Optimiza ciclos de enfriamiento",
        imagen: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        nombre: "Panel Solar Portátil 20W para Carga",
        categoria: "renovables",
        precio: 180000,
        ahorro: "Energía limpia para pequeños dispositivos",
        imagen: "https://images.unsplash.com/photo-1509391365360-b184f395f877?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        nombre: "Sensor de Movimiento Inalámbrico",
        categoria: "automatizacion",
        precio: 52000,
        ahorro: "Apagado automático de iluminación",
        imagen: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        nombre: "Ventilador de Torre Bajo Consumo",
        categoria: "climatizacion",
        precio: 145000,
        ahorro: "Consume 60% menos que un aire acondicionado",
        imagen: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        nombre: "Kit de Sellos Térmicos para Puertas",
        categoria: "aislamiento",
        precio: 35000,
        ahorro: "Conserva la temperatura interior",
        imagen: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=60"
    }
];

let carrito = [];
const contenedorProductos = document.getElementById('contenedor-productos');
const inputBuscador = document.getElementById('buscador');
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const listaCarritoDOM = document.getElementById('lista-carrito');
const totalCarritoDOM = document.getElementById('total-carrito');

function mostrarProductos(listaProductos) {
    if (!contenedorProductos) return;
    
    contenedorProductos.innerHTML = '';
    
    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron productos con ese criterio.</p>`;
        return;
    }

    listaProductos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.style.cssText = "background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; flex-direction: column;";
        
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 180px; object-fit: cover;">
            <div style="padding: 1.2rem; display: flex; flex-direction: column; flex-grow: 1;">
                <h3 style="font-size: 1.1rem; color: var(--color-primario); margin-bottom: 0.5rem;">${producto.nombre}</h3>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 1rem; flex-grow: 1;">✨ ${producto.ahorro}</p>
                <span style="font-size: 1.2rem; font-weight: bold; color: var(--color-secundario); margin-bottom: 1rem;">$ ${producto.precio.toLocaleString()} COP</span>
                <button onclick="agregarAlCarrito(${producto.id})" style="background-color: var(--color-primario); color: white; border: none; padding: 0.6rem; border-radius: 4px; cursor: pointer; font-weight: 600;">Agregar al Carrito</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

function agregarAlCarrito(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    if (productoEncontrado) {
        carrito.push(productoEncontrado);
        actualizarCarritoDOM();
    }
}

function actualizarCarritoDOM() {
    if (!listaCarritoDOM) return;
    
    listaCarritoDOM.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        listaCarritoDOM.innerHTML = `<p style="color: #777; font-size: 0.9rem;">El carrito está vacío.</p>`;
    } else {
        carrito.forEach((item, index) => {
            total += item.precio;
            const li = document.createElement('li');
            li.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.9rem; border-bottom: 1px solid #eee; padding-bottom: 0.3rem;";
            li.innerHTML = `
                <span>${item.nombre}</span>
                <span>$ ${item.precio.toLocaleString()} COP</span>
            `;
            listaCarritoDOM.appendChild(li);
        });
    }

    if (totalCarritoDOM) {
        totalCarritoDOM.textContent = `$ ${total.toLocaleString()} COP`;
    }
}

if (inputBuscador) {
    inputBuscador.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(textoBusqueda));
        mostrarProductos(filtrados);
    });
}

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const categoria = e.target.dataset.categoria;
        if (categoria === 'todos') {
            mostrarProductos(productos);
        } else {
            const filtrados = productos.filter(p => p.categoria === categoria);
            mostrarProductos(filtrados);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (contenedorProductos) {
        mostrarProductos(productos);
    }
});