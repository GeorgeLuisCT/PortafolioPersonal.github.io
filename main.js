// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModalBtn");

// Obtener el elemento de cierre del modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, abrir el modal
btn.onclick = function() {
  modal.classList.add("active");
}

// Cuando el usuario haga clic en el elemento de cierre, cerrar el modal
span.onclick = function() {
  modal.classList.remove("active");
}

// Cuando el usuario haga clic en cualquier lugar fuera del modal, cerrar el modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
}



//DESCARGA DE CV

document.getElementById('descargarBtn').addEventListener('click', function() {
    // URL del archivo PDF
    var pdfUrl = 'documents/CVActualizado.pdf';
    
    var link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'CV Castrejon Jorge Estudiante de IS.pdf'; 
    link.target = '_blank'; 
    
    link.click();
});


function mostrarContenido(sectionClass, index) {

    mostrarIndicador(index)
    // Ocultar todas las secciones
    var secciones = document.querySelectorAll('main section');
    secciones.forEach(function (seccion) {
        seccion.classList.remove('sectionVisible');
    });

    // Mostrar solo la sección correspondiente al botón presionado
    var seccionSeleccionada = document.querySelector('.' + sectionClass);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.add('sectionVisible');
    }

    // Ocultar todos los elementos con la clase .idicadorbar
    var indicadores = document.querySelectorAll('.idicadorbar');
    indicadores.forEach(function (indicador) {
        indicador.style.opacity = '0';
    });

    // Mostrar solo el indicador correspondiente al botón presionado
    var indicadorSeleccionado = document.querySelector('.idicadorbar:nth-child(' + index + ')');
    if (indicadorSeleccionado) {
        indicadorSeleccionado.style.opacity = '1';
    }

    if (index === 2) {
        setTimeout(function() {
            handleItemClickEnd(0);
        }, 0);
    
        setTimeout(function() {
            handleItemClickEnd(1);
        }, 800);
    
        setTimeout(function() {
            handleItemClickEnd(5);
        }, 1600);
        setTimeout(function() {
            handleItemClickEnd(0);
        }, 2400);

    }


    //PARA MOVILES

      var buttons = document.querySelectorAll('#menu button');
        
      buttons.forEach(function(button, inde) {
          if (inde + 1 === index) {
              button.classList.add('selected');
          } else {
              button.classList.remove('selected');
          }
      });
}

function executeWithDelay(index, delays) {
    if (index < delays.length) {
        setTimeout(function() {
            handleItemClickEnd(index);
            executeWithDelay(index + 1, delays);
        }, delays[index]);
    }
}

function mostrarIndicador(indicadorIndex) {
    // Ocultar todos los elementos con la clase .idicadorbar
    var indicadores = document.querySelectorAll('.idicadorbar');
    indicadores.forEach(function (indicador) {
        indicador.style.opacity = '0';
    });

    // Mostrar solo el indicador correspondiente al botón presionado
    var indicadorSeleccionado = document.querySelector('.idicadorbar:nth-child(' + indicadorIndex + ')');
    if (indicadorSeleccionado) {
        indicadorSeleccionado.style.display = 'block';
        indicadorSeleccionado.style.opacity = '1';
    }

}

mostrarIndicador(1);
