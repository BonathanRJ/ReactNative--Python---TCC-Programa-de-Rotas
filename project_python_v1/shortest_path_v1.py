import tkinter as tk
from tkinter import Label, Entry, Button, messagebox
from PIL import Image, ImageTk
import requests
from io import BytesIO
import os
import networkx as nx
import osmnx as ox
import folium

# Obter o diretório atual do script
OS_PATH = os.path.dirname(os.path.abspath('__file__'))

def generate_path(origem_ponto, destino_ponto, perimetro):

    # Dividindo as coordenadas geográficas em longitude (log) e latitude (lat)
    origem_lat = origem_ponto[0]
    origem_log = origem_ponto[1]

    destino_lat = destino_ponto[0]
    destino_log = destino_ponto[1]

    # Se a origem estiver mais longe do equador do que o alvo
    if origem_lat > destino_lat:
        norte = origem_lat
        sul = destino_lat
    else:
        norte = destino_lat
        sul = origem_lat

    # Se a origem estiver mais distante do meridiano principal do que o alvo
    if origem_log > destino_log:
        leste = origem_log
        oeste = destino_log
    else:
        leste = destino_log
        oeste = origem_log

    # Gráfico da estrada
    # Modos do OSMnx = 'drive', 'bike', 'walk', 'all'
    modo = 'drive'

    # Gráfico da rede de caminhos/estradas definindo os perímetros
    estradas = ox.graph_from_bbox(norte + perimetro, sul - perimetro, leste + perimetro, oeste - perimetro,
                                   network_type=modo, simplify=False)
    
    # Busca o nó mais próximo no gráfico OSMNX para o ponto de origem
    origem_no = ox.get_nearest_node(estradas, origem_ponto)

    # Busca o nó mais próximo no gráfico OSMNX para o ponto de destino
    destino_no = ox.get_nearest_node(estradas, destino_ponto)

    # Traçando o menor caminho, utilizando o método 'dijkstra shortest_path'
    rota = nx.shortest_path(estradas, origem_no, destino_no, weight='length', method='dijkstra')

    # Arrays para armazenar os caminhos
    lat = []
    log = []

    for i in rota:
        ponto = estradas.nodes[i]
        log.append(ponto['x'])
        lat.append(ponto['y'])

    # Retornando os caminhos
    return log, lat

### Utilizando a biblioteca Folium para gerar o mapa e adicionar o ponto de origem
def plot_map(origem_ponto, destino_pontos, log, lat):
    print(origem_ponto)
    print(destino_pontos)
    print(log)
    print(lat)

    # Criando mapa e adiciando o ponto de origem
    print("Configurando a imagem...")
    m = folium.Map(location=origem_ponto, zoom_start=12)
    folium.Marker(location=origem_ponto, popup="Origem", icon=folium.Icon(color='black')).add_to(m)

    # Gerando os caminhos mais curtos no mapa
    print("Gerando caminho...")
    for i in range(len(lat)):
        coordenadas = list(zip(lat[i], log[i]))
        folium.PolyLine(coordenadas, color='green', weight=4.5, opacity=1).add_to(m)

    # Gerando as geocoordenadas do destino ao mapa  
    print("Gerando destino...")
    for destino_ponto in destino_pontos:
        folium.Marker(location=destino_ponto, popup="Destino", icon=folium.Icon(color='red')).add_to(m)

    # Salvando o mapa já gerado em um arquivo html
    print("Salvando o mapa...")
    m.save(os.path.join(OS_PATH, 'project_v1', 'saida', 'coordenadas.html'))

def gerar_caminho():
    try:
        origem_lat = float(origem_lat_entry.get())
        origem_lon = float(origem_lon_entry.get())
        num_destinos = int(num_destinos_entry.get())

        origem_ponto = (origem_lat, origem_lon)
        perimetro = 0.10

        destino_pontos = []
        for i in range(num_destinos):
            dest_lat = float(destino_lat_entries[i].get())
            dest_lon = float(destino_lon_entries[i].get())
            destino_pontos.append((dest_lat, dest_lon))

        caminhos = []
        for destino_ponto in destino_pontos:
            x, y = generate_path(origem_ponto, destino_ponto, perimetro)
            caminhos.append((x, y))

        plot_map(origem_ponto, destino_pontos, [c[0] for c in caminhos], [c[1] for c in caminhos])

    except ValueError:
        messagebox.showerror("Erro", "Certifique-se de inserir valores válidos.")

# Função para criar campos de entrada para destinos
def criar_campos_destino(num_destinos):
    for entry in destino_lat_entries + destino_lon_entries:
        entry.destroy()

    destino_lat_entries.clear()
    destino_lon_entries.clear()

    for i in range(num_destinos):
        lat_label = Label(root, text=f"Destino {i + 1} - Latitude:")
        lat_label.grid(row=i + 3, column=0)

        lat_entry = Entry(root)
        lat_entry.grid(row=i + 3, column=1)
        destino_lat_entries.append(lat_entry)

        lon_label = Label(root, text=f"Destino {i + 1} - Longitude:")
        lon_label.grid(row=i + 3, column=2)

        lon_entry = Entry(root)
        lon_entry.grid(row=i + 3, column=3)
        destino_lon_entries.append(lon_entry)

    # Botão para acionar a função de geração de caminho
    gerar_caminho_button.grid(row=num_destinos + 4, column=1, columnspan=2)

# Iniciar a interface
if __name__ == "__main__":
    root = tk.Tk()
    root.title("Insira as coordenadas")

    # Baixar a imagem do mapa a partir do link
    response = requests.get("https://cdn-icons-png.flaticon.com/512/854/854929.png")
    image_data = response.content

    # Configuração da imagem do mapa
    image = Image.open(BytesIO(image_data))
    image = image.resize((300, 300))  
    photo = ImageTk.PhotoImage(image)

    label = Label(root, image=photo)
    label.image = photo
    label.grid(row=0, column=4, rowspan=7, columnspan=4)

    # Labels e campos de entrada para origem
    Label(root, text="Latitude - Origem:").grid(row=0, column=0)
    origem_lat_entry = Entry(root)
    origem_lat_entry.grid(row=0, column=1)

    Label(root, text="Longitude - Origem:").grid(row=0, column=2)  # Modificado para coluna 2
    origem_lon_entry = Entry(root)
    origem_lon_entry.grid(row=0, column=3)  # Modificado para coluna 3

    # Labels e campos de entrada para número de destinos
    Label(root, text="Número de Destino(s):").grid(row=1, column=0)
    num_destinos_entry = Entry(root)
    num_destinos_entry.grid(row=1, column=1)

    destino_lat_entries = []
    destino_lon_entries = []

    # Botão para criar campos de entrada para destinos
    criar_campos_button = Button(root, text="Adicionar Destino(s)", command=lambda: criar_campos_destino(int(num_destinos_entry.get())))
        
    criar_campos_button.grid(row=1, column=2, columnspan=2)  # Modificado para coluna 2 e coluna 3

    # Botão para acionar a função de geração de caminho
    gerar_caminho_button = Button(root, text="Gerar Caminho(s)", command=gerar_caminho)
    gerar_caminho_button.grid(row=2, column=2, columnspan=2)  # Modificado para coluna 2 e coluna 3

    root.mainloop()