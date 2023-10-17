//Variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Even Listeners
evenListeners();

function evenListeners(){
    //Cuando el usuario agrega un nuevo tweets
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}




//funciones
function agregarTweet(e){
    e.preventDefault();


    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');

        return; //Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado vamos a crear el HTML
    crearHTML();


    //Reiniciar el formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //Crear el HTML
            const li = document.createElement('li');


            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agregar los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}


//Limpiar HTML
function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
