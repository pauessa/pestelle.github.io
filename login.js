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
                window.location.href = "home.html";
            } else {
                alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function isValidCredentials(username, password, validCredentials) {
    // Verificar si las credenciales proporcionadas coinciden con las válidas del archivo
    const inputUsernameLower = username.toLowerCase();

    // Verificar las credenciales sin distinción de mayúsculas/minúsculas.
    return validCredentials.username.toLowerCase() === inputUsernameLower && validCredentials.password === password;
}
