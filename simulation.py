import time
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

# Initialisation du navigateur
driver = uc.Chrome()

# Charger le fichier 'plots_sql.json' contenant les données
with open('plots_sql.json', 'r') as file:
    plots_data = json.load(file)

def simulate_typing(element, text, delay=0.1):
    """Simule la saisie du texte dans un champ avec un délai entre chaque caractère."""
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, element.get_attribute("id"))))
    for char in text:
        element.send_keys(char)
        time.sleep(delay)

def clean_plotly_data(data):
    """Nettoie les données pour avoir des clés sans guillemets et des valeurs correctement formatées."""
    if isinstance(data, dict):
        cleaned_items = []
        for key, value in data.items():
            cleaned_key = key  # Pas de guillemets pour les clés

            # Maintenant on traite les valeurs
            if isinstance(value, dict):
                cleaned_value = f"{{{clean_plotly_data(value)}}}"
            elif isinstance(value, list):
                cleaned_list = []
                for item in value:
                    if isinstance(item, str):
                        item = item.replace("'", "\\'")  # Échapper les apostrophes
                        cleaned_list.append(f"'{item}'")  # Toujours mettre quotes pour les strings dans les listes
                    else:
                        cleaned_list.append(str(item))
                cleaned_value = f"[{', '.join(cleaned_list)}]"
            elif isinstance(value, str):
                if value.startswith('data.'):
                    cleaned_value = value
                else:
                    value = value.replace("'", "\\'")  # Échapper les apostrophes dans les strings
                    cleaned_value = f"'{value}'"
            elif isinstance(value, bool):  # Ajout pour gérer les booléens
                cleaned_value = 'true' if value else 'false'  # Convertir en minuscule
            else:
                cleaned_value = value

            cleaned_items.append(f"{cleaned_key}: {cleaned_value}")

        return ', '.join(cleaned_items)

    return str(data)


try:
    # Ouvrir la page
    driver.get("http://127.0.0.1:5500/templates/index.html")
    time.sleep(5)  # Attendre que la page charge

    # Initialisation du compteur pour suivre le nombre de fois que l'utilisateur choisit "y"
    item_index = 0

    while item_index < len(plots_data):
        item = plots_data[item_index]

        # 1. Attente explicite pour que l'élément description soit visible et cliquable
        description_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "description"))
        )
        simulate_typing(description_element, item['nominalisation'])

        # 2. Simuler un appui sur le bouton 'Enter' après la description
        description_element.send_keys(Keys.ENTER)

        # 3. Attente explicite pour que l'élément sqlTerminal soit visible et cliquable
        sql_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "sqlTerminal"))
        )
        simulate_typing(sql_element, item['sql'], delay=0.2)
        sql_element.send_keys(Keys.ENTER)

        # 4. Cliquer sur 'Send the query' après une attente explicite
        send_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Send the query']"))
        )
        send_button.click()

        # 5. Attendre la réponse et gérer l'alerte
        try:
            WebDriverWait(driver, 15).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()  # Cliquer sur 'OK' dans l'alerte
        except:
            print("⚠️ Alerte non présente ou problème d'interaction.")

        # 6. Attente explicite pour le bouton 'Show / Hide the results' et clique
        toggle_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Show / Hide the results']"))
        )
        toggle_button.click()

        # 7. Attendre 3 secondes avant de cliquer à nouveau
        time.sleep(3)
        toggle_button.click()

        # 8. Attente explicite pour saisir le code plotly (avec défilement si nécessaire)
        plotly_code = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "plotlyCode"))
        )
        plotly_data_js = clean_plotly_data(item['plotly']['data'])
        simulate_typing(plotly_code, plotly_data_js)

        # 9. Attente explicite pour saisir le layout de plotly
        plotly_layout = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, "plotlyLayout"))
        )
        plotly_layout_str = clean_plotly_data(item['plotly']['layout'])
        simulate_typing(plotly_layout, plotly_layout_str)

        # 10. Attente explicite pour cliquer sur 'Draw the graph'
        draw_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[text()='Draw the graph']"))
        )
        draw_button.click()

        # 11. Demander à l'utilisateur s'il souhaite continuer
        continue_simulation = input(f"Would you like to continue the simulation for item {item_index + 1}? (y/n): ")
        if continue_simulation.lower() == 'y':
            driver.refresh()  # Recharge la page après le choix 'y'
            time.sleep(5)  # Attendre que la page recharge complètement
        else:
            break  # Si l'utilisateur choisit 'n', on arrête la boucle
        item_index += 1  # Passer à l'élément suivant si l'utilisateur choisit "y"


except Exception as e:
    print("❌ Erreur :", e)

finally:
    driver.quit()
    print("🚪 Navigateur fermé.")
