// Función para obtener personajes por rango (limitado a 5 personajes con fetch)
async function fetchStarWarsCharacters(start, end, color, containerId) {
    const container = document.getElementById(containerId);

    
    if (container.children.length >= 5) {
        console.log(`Ya se han cargado 5 personajes para ${color}`);
        return; // Si ya hay 5 personajes, no hacemos nada
    }

    container.innerHTML = ''; 
    container.style.display = 'flex'; 

    console.log(`Cargando personajes del rango ${start} al ${end}`); 

   
    for (let i = start; i <= end && i <= start + 4; i++) {  // Limitar a 5 personajes
        try {
            const response = await fetch(`https://swapi.dev/api/people/${i}/`);
            if (response.ok) {
                const character = await response.json();
                console.log(`Personaje cargado: ${character.name}`); 

                // Mostrar las cajas con un retraso entre ellas (por ejemplo, 200ms)
                setTimeout(() => {
                    createCharacterCard(character.name, character.height, character.mass, color, container);
                }, (i - start) * 1000); // Controlar el tiempo de aparición secuencial
            } else {
                console.error(`Error al obtener el personaje con ID ${i}: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    }
}

// Función para crear una tarjeta con los datos del personaje
function createCharacterCard(name, height, mass, color, container) {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.backgroundColor = color; 

    const content = document.createElement('div');
    content.innerHTML = `<h3>${name}</h3><p>Altura: ${height} cm</p><p>Peso: ${mass} kg</p>`;

    characterCard.appendChild(circle);
    characterCard.appendChild(content);
    container.appendChild(characterCard);
}

// Eventos para hover en las cajas principales (limitado a 5 personajes por caja)
document.getElementById('red-box').addEventListener('mouseenter', () => {
    console.log('Mouse entró en la caja roja'); 
    fetchStarWarsCharacters(1, 5, 'red', 'red-characters'); 
});

document.getElementById('green-box').addEventListener('mouseenter', () => {
    console.log('Mouse entró en la caja verde'); 
    fetchStarWarsCharacters(7, 11, 'green', 'green-characters'); 
});

document.getElementById('blue-box').addEventListener('mouseenter', () => {
    console.log('Mouse entró en la caja azul'); 
    fetchStarWarsCharacters(12, 16, 'blue', 'blue-characters'); 
});






