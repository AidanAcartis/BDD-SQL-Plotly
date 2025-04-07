let data = {};  // Stocker les résultats de la requête

async function sendQuery() {
    const query = document.getElementById('sqlQuery').value;
    const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    });
    const result = await response.json();
    if (result.status === 'success') {
        data = result.data; // Stockage des données reçues
        document.getElementById('resultArea').innerText = JSON.stringify(data, null, 2); 
        // 🔥 Affiche joliment le JSON
        alert('Données reçues avec succès ! Tu peux tracer ton graphe.');
    } else {
        alert('Erreur: ' + result.message);
    }
}

function toggleResult() {
    const resultDiv = document.getElementById('queryResult');
    if (resultDiv.style.display === 'none') {
        resultDiv.style.display = 'block'; // Affiche
    } else {
        resultDiv.style.display = 'none';  // Cache
    }
}


function drawPlot() {
    const code = document.getElementById('plotlyCode').value;
    try {
        const plotData = [eval('({' + code + '})')];
        Plotly.newPlot('graph', plotData);

        // Ajouter événement de click
        var graphDiv = document.getElementById('graph');
        graphDiv.on('plotly_click', function(data){
            const point = data.points[0];
            let pointInfoText = '';
    
            // Dynamically iterate through all the properties of the point object
            for (let key in point) {
                // Avoid including internal properties like 'fullData'
                if (point.hasOwnProperty(key) && key !== 'fullData') {
                    pointInfoText += `${key}: ${point[key]}<br>`;
                }
            }
    
            // Update the 'pointInfo' element with all available point data
            document.getElementById('pointInfo').innerHTML = pointInfoText;
        });
    } catch (e) {
        alert('Erreur dans le code Plotly : ' + e.message);
    }
}