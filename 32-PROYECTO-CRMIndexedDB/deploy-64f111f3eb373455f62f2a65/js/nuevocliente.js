(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);
    
        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };
    
        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result; 
        };
    }


    function validarCliente(e){
        e.preventDefault();

        //Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '' ){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Crear un objeto con la informacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id : Date.now()
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Hubo un error', 'error');
        };

        transaction.oncomplete = function(){
            console.log('Cliente Agergado');

            imprimirAlerta('El cliente se agrego correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }

    }

})();