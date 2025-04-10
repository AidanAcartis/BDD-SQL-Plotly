
**Requête SQL :**
```sql
SELECT 
    Profession,
    AVG(CGPA) AS Average_CGPA,
    100.0 * SUM(Depression) / COUNT(*) AS Depression_Rate
FROM 
    students
GROUP BY 
    Profession
HAVING 
    COUNT(*) > 5
ORDER BY 
    Depression_Rate DESC;
```
```javascript
    x: data.Profession,
    y: data.Depression,
    type: 'bar',
    marker: { color: 'salmon' }
```

### 1. **Graphique à barres empilées (Stacked Bar Chart)**

```sql
SELECT 
    Profession,
    SUM(CASE WHEN Depression = 1 THEN 1 ELSE 0 END) AS Depressed,
    SUM(CASE WHEN Depression = 0 THEN 1 ELSE 0 END) AS Not_Depressed
FROM 
    students
GROUP BY 
    Profession
ORDER BY 
    Depressed DESC;

x: data.Profession,
y: [data.Depressed, data.Not_Depressed],
type: 'bar',
name: 'Depressed & Not Depressed',
barmode: 'stack',
marker: { color: ['#FF6347', '#90EE90'] }
```

### 2. **Graphique en ligne avec des sous-groupes (Grouped Line Chart)**

```sql
SELECT 
    Age,
    AVG(CGPA) AS Average_CGPA,
    AVG(Study_Satisfaction) AS Avg_Study_Satisfaction
FROM 
    students
GROUP BY 
    Age
ORDER BY 
    Age;

x: data.Age,
y: [data.Average_CGPA, data.Avg_Study_Satisfaction],
type: 'scatter',
mode: 'lines+markers',
name: ['Average CGPA', 'Study Satisfaction'],
line: { color: ['blue', 'orange'] }
```

### 3. **Graphique à secteurs (Pie Chart)**

```sql
SELECT 
    Gender,
    COUNT(*) AS Gender_Count
FROM 
    students
GROUP BY 
    Gender;

labels: data.Gender,
values: data.Gender_Count,
type: 'pie',
name: 'Gender Distribution',
marker: { colors: ['lightblue', 'lightpink'] }
```

### 4. **Graphique en histogramme (Histogram)**

```sql
SELECT 
    Age,
    COUNT(*) AS Age_Count
FROM 
    students
GROUP BY 
    Age
ORDER BY 
    Age;

x: data.Age,
y: data.Age_Count,
type: 'histogram',
name: 'Age Distribution',
marker: { color: 'royalblue' }
```

### 5. **Graphique en box plot (Box Plot)**

```sql
SELECT 
    Profession,
    CGPA
FROM 
    students
WHERE 
    CGPA IS NOT NULL;

y: data.CGPA,
x: data.Profession,
type: 'box',
name: 'CGPA Distribution by Profession',
marker: { color: 'purple' }
```

### 6. **Graphique en courbe (Line Chart)**

```sql
SELECT 
    Age,
    AVG(CGPA) AS Average_CGPA
FROM 
    students
GROUP BY 
    Age
ORDER BY 
    Age;

x: data.Age,
y: data.Average_CGPA,
type: 'scatter',
mode: 'lines+markers',
name: 'Average CGPA by Age',
line: { color: 'green' }
```

### 7. **Graphique en nuage de points (Bubble Chart)**

```sql
SELECT 
    Age,
    CGPA,
    Study_Satisfaction
FROM 
    students
WHERE 
    Age IS NOT NULL AND CGPA IS NOT NULL AND Study_Satisfaction IS NOT NULL;

x: data.Age,
y: data.CGPA,
size: data.Study_Satisfaction,
type: 'scatter',
mode: 'markers',
name: 'Study Satisfaction vs CGPA',
marker: { color: 'blue', opacity: 0.5 }
```

### 8. **Graphique à barres horizontales (Horizontal Bar Chart)**

```sql
SELECT 
    Profession,
    COUNT(*) AS Profession_Count
FROM 
    students
GROUP BY 
    Profession
ORDER BY 
    Profession_Count DESC;

x: data.Profession_Count,
y: data.Profession,
type: 'bar',
orientation: 'h',
name: 'Profession Distribution',
marker: { color: 'coral' }
```

### 9. **Graphique en radar (Radar Chart)**

```sql
SELECT 
    Profession,
    AVG(Study_Satisfaction) AS Avg_Study_Satisfaction,
    AVG(Job_Satisfaction) AS Avg_Job_Satisfaction,
    AVG(Sleep_Duration) AS Avg_Sleep_Duration
FROM 
    students
GROUP BY 
    Profession;

r: [data.Avg_Study_Satisfaction, data.Avg_Job_Satisfaction, data.Avg_Sleep_Duration],
theta: ['Study Satisfaction', 'Job Satisfaction', 'Sleep Duration'],
type: 'scatterpolar',
mode: 'lines+markers',
name: 'Satisfaction Levels by Profession',
line: { color: 'indigo' }
```

### 10. **Graphique en heatmap (Heatmap)**

```sql
SELECT 
    Age,
    Profession,
    AVG(CGPA) AS Average_CGPA
FROM 
    students
GROUP BY 
    Age, Profession;

z: data.Average_CGPA,
x: data.Age,
y: data.Profession,
type: 'heatmap',
colorscale: 'Viridis',
colorbar: { title: 'Average CGPA' }
```

---

```sql
SELECT 
    Age,
    Gender,
    COUNT(*) AS Suicidal_Thoughts_Count
FROM 
    students
WHERE 
    Suicidal_Thoughts = 'Yes'
GROUP BY 
    Age, Gender
HAVING 
    COUNT(*) > 3
ORDER BY 
    Suicidal_Thoughts_Count DESC;

    x: data.Age,
    y: data.Suicidal_Thoughts_Count,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Suicidal Thoughts Count',
    line: { color: 'crimson' }
    
    const plotLayout = `
{
    title: 'Suicidal Thoughts by Age and Gender',
    xaxis: {
        title: 'Age',
        showgrid: true,
        zeroline: false
    },
    yaxis: {
        title: 'Number of Suicidal Thoughts',
        showgrid: true,
        zeroline: false
    },
    showlegend: true,
    plot_bgcolor: '#f4f4f4',
    paper_bgcolor: '#f9f9f9'
}`;
```
