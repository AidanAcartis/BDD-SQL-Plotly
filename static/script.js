let data = {};  // Stocker les résultats de la requête

window.onload = () => {
    const sqlTerminal = document.getElementById('sqlTerminal');
    addPrompt(sqlTerminal);

    sqlTerminal.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Empêcher le saut de ligne classique
            sqlTerminal.appendChild(document.createElement('br'));
            addPrompt(sqlTerminal);
            placeCaretAtEnd(sqlTerminal);
        }
    });
};

function addPrompt(terminal) {
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = '> ';
    terminal.appendChild(prompt);
}

function placeCaretAtEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function displayTableFromData(data) {
    const container = document.getElementById('queryResult');
    container.innerHTML = ''; // Nettoie l'ancien contenu

    if (!data || Object.keys(data).length === 0) {
        container.textContent = "Aucune donnée à afficher.";
        return;
    }

    // Récupère les noms des colonnes (clés)
    const columns = Object.keys(data);

    // Récupère le nombre de lignes
    const numRows = data[columns[0]].length;

    // Crée le tableau
    const table = document.createElement('table');
    table.className = 'data-table'; // tu peux ajouter du CSS pour ce style

    // Crée l'en-tête
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crée le corps du tableau
    const tbody = document.createElement('tbody');
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = data[col][i];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    container.appendChild(table);
}


async function sendQuery() {
    const terminal = document.getElementById('sqlTerminal');
    const rawText = terminal.innerText;

    // Enlève tous les "mysql> " pour reconstituer la vraie requête
    const query = rawText.split('\n')
        .map(line => line.replace(/^>\s*/, ''))   // ici juste > 
        .join(' ');

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
        displayTableFromData(data);
        alert('Données reçues avec succès ! Tu peux tracer ton graphe.');
    } else {
        alert('Erreur: ' + result.message);
    }
    document.getElementById('resultArea').textContent = JSON.stringify(result, null, 2);
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
        const layout = eval('({' + document.getElementById('plotlyLayout').value + '})');
        Plotly.newPlot('graph', plotData, layout);
        
        // Ajouter événement de click
        var graphDiv = document.getElementById('graph');
        // graphDiv.on('plotly_click', function(data){
        //     const point = data.points[0];
        //     let pointInfoText = '';
    
        //     // Dynamically iterate through all the properties of the point object
        //     for (let key in point) {
        //         // Avoid including internal properties like 'fullData', 'data', 'xaxis', 'yaxis'
        //         if (point.hasOwnProperty(key) && !['fullData', 'data', 'xaxis', 'yaxis'].includes(key)) {
        //             pointInfoText += `${key}: ${point[key]}<br>`;
        //         }
        //     }
    
        //     // Update the 'pointInfo' element with all available point data
        //     document.getElementById('pointInfo').innerHTML = pointInfoText;
        // });
        graphDiv.on('plotly_click', function(data){
            const point = data.points[0];
            let pointInfoText = '';
        
            // Récupération des titres des axes
            const layout = document.getElementById('plotlyLayout').value;
            const parsedLayout = eval('({' + layout + '})');
            const xAxisTitle = parsedLayout?.xaxis?.title || 'X';
            const yAxisTitle = parsedLayout?.yaxis?.title || 'Y';
        
            // Ajout des données avec les bons titres
            pointInfoText += `curveNumber: ${point.curveNumber}<br>`;
            pointInfoText += `pointNumber: ${point.pointNumber}<br>`;
            pointInfoText += `pointIndex: ${point.pointIndex}<br>`;
            pointInfoText += `${xAxisTitle}: ${point.x}<br>`;
            pointInfoText += `${yAxisTitle}: ${point.y}<br>`;
        
            // Ajoute aussi les labels personnalisés s'ils existent
            if (point.hasOwnProperty('label')) {
                pointInfoText += `label: ${point.label}<br>`;
            }
            if (point.hasOwnProperty('value')) {
                pointInfoText += `value: ${point.value}<br>`;
            }
        
            document.getElementById('pointInfo').innerHTML = pointInfoText;
        
            // Affiche la popup
            const modal = document.getElementById('popupModal');
            modal.style.display = 'block';
        
            // Ferme la popup quand on clique sur X
            document.getElementById('popupClose').onclick = function () {
                modal.style.display = 'none';
            };
        
            // Ferme la popup quand on clique en dehors
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        });        
        
    } catch (e) {
        alert('Erreur dans le code Plotly : ' + e.message);
    }
}

