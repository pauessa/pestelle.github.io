function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const rutaArchivo = 'userPass.valid';

    // Usa fetch para cargar el archivo
    fetch(rutaArchivo)
        .then(response => {
            // Verifica si la solicitud fue exitosa (código de estado 200)
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo.');
            }
            // Devuelve el cuerpo de la respuesta como objeto JSON
            return response.json();
        })
        .then(validCredentials => {
            // Verifica si las credenciales proporcionadas son válidas
            if (isValidCredentials(username, password, validCredentials)) {
                console.log('Credenciales válidas. Acceso permitido.');
            } else {
                console.log('Credenciales no válidas. Acceso denegado.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function isValidCredentials(username, password, validCredentials) {
    // Verificar si las credenciales proporcionadas coinciden con las válidas del archivo
    return validCredentials.username === username && validCredentials.password === password;
}
