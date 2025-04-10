Voici des requêtes plus complexes avec différentes syntaxes pour les graphes demandés, toujours basées sur des exemples avec des résultats SQL et des graphiques Plotly.

---

**1. Requête SQL avec graphique de type "violin" :**

```sql
SELECT 
    Dietary_Habits,
    AVG(CGPA) AS Average_CGPA,
    MAX(Sleep_Duration) AS Max_Sleep_Duration
FROM 
    students
WHERE 
    Dietary_Habits IS NOT NULL
GROUP BY 
    Dietary_Habits
HAVING 
    AVG(CGPA) > 6
ORDER BY 
    Average_CGPA DESC;
```

**Code Plotly :**
```js
const code = `
{
    x: data.Dietary_Habits,
    y: data.Average_CGPA,
    type: 'violin',
    box: { visible: true },
    line: { color: 'red' },
    marker: { color: 'lightblue' },
    name: 'Average CGPA'
}
`;
```

---

**2. Requête SQL avec graphique de type "funnel" :**

```sql
SELECT 
    Suicidal_Thoughts,
    COUNT(*) AS Count,
    AVG(Age) AS Average_Age
FROM 
    students
GROUP BY 
    Suicidal_Thoughts
HAVING 
    COUNT(*) > 5
ORDER BY 
    Count DESC;
```

**Code Plotly :**
```js
const code = `
{
    x: data.Suicidal_Thoughts,
    y: data.Count,
    type: 'funnel',
    name: 'Suicidal Thoughts Count',
    marker: { color: 'green' }
}
`;
```

---

**3. Requête SQL avec graphique de type "box" :**

```sql
SELECT 
    Age,
    AVG(CGPA) AS Avg_CGPA,
    MAX(Work_Study_Hours) AS Max_Work_Study_Hours,
    MIN(Work_Study_Hours) AS Min_Work_Study_Hours
FROM 
    students
WHERE 
    Age BETWEEN 20 AND 30
GROUP BY 
    Age
ORDER BY 
    Age;
```

**Code Plotly :**
```js
const code = `
{
    x: data.Age,
    y: data.Avg_CGPA,
    type: 'box',
    name: 'Average CGPA',
    boxmean: 'sd',
    marker: { color: 'purple' }
}
`;
```

---

**4. Requête SQL avec graphique de type "scatter" (avec lignes de régression) :**

```sql
SELECT 
    Age,
    AVG(CGPA) AS Average_CGPA,
    MAX(Work_Pressure) AS Max_Work_Pressure
FROM 
    students
WHERE 
    Age BETWEEN 18 AND 35
GROUP BY 
    Age
HAVING 
    AVG(CGPA) > 6
ORDER BY 
    Age;
```

**Code Plotly :**
```js
const code = `
{
    x: data.Age,
    y: data.Average_CGPA,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Average CGPA vs Age',
    line: { color: 'blue', dash: 'solid' },
    marker: { color: 'orange' }
}
`;
```

---

**5. Requête SQL avec graphique de type "pie" :**

```sql
SELECT 
    Gender,
    COUNT(*) AS Gender_Count
FROM 
    students
GROUP BY 
    Gender
HAVING 
    COUNT(*) > 10;
```

**Code Plotly :**
```js
const code = `
{
    labels: data.Gender,
    values: data.Gender_Count,
    type: 'pie',
    name: 'Gender Distribution',
    marker: { colors: ['lightblue', 'pink'] }
}
`;
```

---

**6. Requête SQL avec graphique de type "histogram" :**

```sql
SELECT 
    Age,
    COUNT(*) AS Count
FROM 
    students
WHERE 
    Age BETWEEN 18 AND 40
GROUP BY 
    Age
ORDER BY 
    Age;
```

**Code Plotly :**
```js
const code = `
{
    x: data.Age,
    y: data.Count,
    type: 'histogram',
    name: 'Age Distribution',
    marker: { color: 'lightgreen' }
}
`;
```

---

Ces exemples montrent différentes syntaxes SQL avec des groupes, des conditions et des tris tout en utilisant des types de graphiques variés dans Plotly. Les résultats des requêtes SQL sont ensuite utilisés pour remplir dynamiquement les données dans les graphiques.

Si tu as besoin de plus d'exemples ou de précisions, n'hésite pas à demander ! 😊