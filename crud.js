  var db = firebase.firestore();

  //Codigo para agregar registros a mi colección
  function agregar(){
      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var curp = document.getElementById('curp').value;
      var edad = document.getElementById('edad').value;
      var domicilio = document.getElementById('domicilio').value;
      var municipio = document.getElementById('municipio').value;
    
        db.collection("users").add({
        name: nombre,
        last: apellido,
        curp: curp,
        age: edad,
        address: domicilio,
        town: municipio
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('curp').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('domicilio').value = '';
            document.getElementById('municipio').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
  }

  //Codigo para Leer o Mostrar registros de mi colección
  //Leer el id de la tabla
  var tabla = document.getElementById('tabla');

  db.collection("users").onSnapshot((querySnapshot) => {
      tabla.innerHTML = ''; //Limpiar mi tabla
    querySnapshot.forEach((doc) => {
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().name}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().curp}</td>
            <td>${doc.data().age}</td>
            <td>${doc.data().address}</td>
            <td>${doc.data().town}</td>
            <td><button class="btn btn-outline-success" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-outline-warning" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().last}','${doc.data().curp}','${doc.data().age}','${doc.data().address}','${doc.data().town}')">Editar</button></td>
        </tr>
        `
        });
    });

    //borrar documento
    function eliminar(id){
        db.collection("users").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    //Editar Documento
    function editar(id, nombre, apellido, curp, edad, domicilio, municipio){
        console.log(id);
        var nombre = document.getElementById('nombre').value = nombre;
        var apellido = document.getElementById('apellido').value = apellido;
        var curp = document.getElementById('curp').value = curp;
        var edad = document.getElementById('edad').value = edad;
        var domicilio = document.getElementById('domicilio').value = domicilio;
        var municipio = document.getElementById('municipio').value = municipio;
        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar';

        boton.onclick = function(){
            var washingtonRef = db.collection("users").doc(id);

            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var curp = document.getElementById('curp').value;
            var edad = document.getElementById('edad').value;
            var domicilio = document.getElementById('domicilio').value;
            var municipio = document.getElementById('municipio').value;

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                name: nombre,
                last: apellido,
                curp: curp,
                age: edad,
                address: domicilio,
                town: municipio
            })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar';
                window.location.reload();
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }