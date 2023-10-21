import os
import networkx as nx 
import osmnx as ox 
import folium 
from geopy.geocoders import Nominatim
import tkinter as tk
from tkinter import Label, Entry, Button, Frame
from PIL import Image, ImageTk
import requests
from io import BytesIO

# Obter o diretório atual do script
OS_PATH = os.path.dirname(os.path.realpath('__file__'))

# Função para obter coordenadas a partir de um endereço
def get_coordinates_from_address(street_number, street_name, city, country, neighborhood=None):
    address = f"{street_number} {street_name}, {city}, {country}"
    if neighborhood:
        address = f"{street_number} {street_name}, {neighborhood}, {city}, {country}"

    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(address)
    
    if location is not None:
        return location.latitude, location.longitude
    else:
        print(f"Não foi possível obter coordenadas para o endereço: {address}")
        return None

# Função para gerar o caminho
def generate_path(origem_numero, origem_nome_rua, origem_bairro, origem_cidade, origem_pais,
                  destinos, perimetro, estradas):
    origem_ponto = get_coordinates_from_address(origem_numero, origem_nome_rua, origem_cidade, origem_pais, origem_bairro)

    if origem_ponto is None:
        return None, None

    destinos_pontos = []
    for destino_info in destinos:
        destino_numero, destino_nome_rua, destino_bairro, destino_cidade, destino_pais = destino_info
        destino_ponto = get_coordinates_from_address(destino_numero, destino_nome_rua, destino_cidade, destino_pais, destino_bairro)
        if destino_ponto is not None:
            destinos_pontos.append(destino_ponto)

    if not destinos_pontos:
        return None, None

    if origem_ponto[0] > max(destino[0] for destino in destinos_pontos):
        norte = origem_ponto[0]
        sul = min(destino[0] for destino in destinos_pontos)
    else:
        norte = max(destino[0] for destino in destinos_pontos)
        sul = origem_ponto[0]

    if origem_ponto[1] > max(destino[1] for destino in destinos_pontos):
        leste = origem_ponto[1]
        oeste = min(destino[1] for destino in destinos_pontos)
    else:
        leste = max(destino[1] for destino in destinos_pontos)
        oeste = origem_ponto[1]

    modo = 'drive'
    estradas = ox.graph_from_bbox(norte + perimetro, sul - perimetro, leste + perimetro, oeste - perimetro,
                                   network_type=modo, simplify=False)

    origem_no = ox.nearest_nodes(estradas, origem_ponto[1], origem_ponto[0])

    destinos_nos = [ox.nearest_nodes(estradas, destino_ponto[1], destino_ponto[0]) for destino_ponto in destinos_pontos]

    caminhos = []
    for destino_no in destinos_nos:
        rota = nx.shortest_path(estradas, origem_no, destino_no, weight='length', method='dijkstra')
        caminhos.append(rota)

    return caminhos, estradas

# Função para plotar o mapa
def plot_map(origem_ponto, destinos_pontos, caminhos, estradas):
    print(origem_ponto)
    print(destinos_pontos)
    print(caminhos)

    m = folium.Map(location=origem_ponto, zoom_start=12)
    folium.Marker(location=origem_ponto, popup="Origem", icon=folium.Icon(color='black')).add_to(m)

    for i, caminho in enumerate(caminhos):
        for j in range(len(caminho)-1):
            ponto_inicial = estradas.nodes[caminho[j]]
            ponto_final = estradas.nodes[caminho[j+1]]
            coordenadas = [(ponto_inicial['y'], ponto_inicial['x']), (ponto_final['y'], ponto_final['x'])]
            folium.PolyLine(coordenadas, color='green', weight=4.5, opacity=1).add_to(m)

        folium.Marker(location=destinos_pontos[i], popup="Destino", icon=folium.Icon(color='red')).add_to(m)

    m.save(os.path.join(OS_PATH, 'project_python_v1', 'saida', 'endereço.html'))

# Função para adicionar dinamicamente campos de entrada para destino
def add_destination_entry():
    new_entry = Entry(dest_frame, width=63)
    new_entry.grid(row=dest_frame.grid_size()[1], column=0, columnspan=2, pady=10)
    destination_entries.append(new_entry)

# Função para excluir o último campo de entrada para destino
def delete_destination_entry():
    if len(destination_entries) > 1:
        entry_to_delete = destination_entries.pop()
        entry_to_delete.destroy()

# Função principal
def process_data():
    origem_info = origem_input.get().split(', ')
    destinos_info = [entry.get().split(', ') for entry in destination_entries]

    origem_numero, origem_nome_rua, origem_bairro, origem_cidade, origem_pais = origem_info
    perimetro = 0.10

    caminhos, estradas = generate_path(origem_numero, origem_nome_rua, origem_bairro, origem_cidade, origem_pais,
                                       destinos_info, perimetro, None)

    if not caminhos:
        print("Não foi possível gerar o caminho.")
        return

    origem_ponto = (estradas.nodes[caminhos[0][0]]['y'], estradas.nodes[caminhos[0][0]]['x'])

    destinos_pontos = [(estradas.nodes[caminho[-1]]['y'], estradas.nodes[caminho[-1]]['x']) for caminho in caminhos]

    plot_map(origem_ponto, destinos_pontos, caminhos, estradas)


# Iniciar a interface
if __name__ == "__main__":
    root = tk.Tk()
    root.title("Caminho mais curto")

    # Adiciona uma margem à esquerda
    root.geometry("+50+50")  # Ajuste os valores conforme necessário

    # Rótulos e widgets de entrada para inserir informações de origem e destino
    Label(root, text="Insira o local de partida").grid(row=0, column=0, columnspan=2, pady=10, padx=10)  # Adiciona padx
    origem_input = Entry(root, width=63)
    origem_input.grid(row=1, column=0, columnspan=2, pady=10, padx=10)  # Adiciona padx

    Label(root, text="Insira o local do(s) destino(s)").grid(row=2, column=0, columnspan=2, pady=10, padx=10)  # Adiciona padx

    # Quadro para conter entradas de destino
    dest_frame = Frame(root)
    dest_frame.grid(row=3, column=0, columnspan=2, pady=10, padx=10)  # Adiciona padx

    # Entrada de destino inicial
    dest_entry = Entry(dest_frame, width=63)
    dest_entry.grid(row=0, column=0, columnspan=2, pady=10)
    destination_entries = [dest_entry]

    # Botão para adicionar mais entradas de destino
    add_button = Button(root, text="Adicionar Destino(s)", command=add_destination_entry)
    add_button.grid(row=4, column=0, pady=10, padx=10)  # Adiciona padx

    # Botão para excluir a última entrada de destino
    delete_button = Button(root, text="Remover Destino(s)", command=delete_destination_entry)
    delete_button.grid(row=4, column=1, pady=10, padx=10)  # Adiciona padx

    # Botão para processar os dados
    Button(root, text="Gerar Caminho(s)", command=process_data).grid(row=5, column=0, columnspan=2, pady=20, padx=10)  # Adiciona padx

    # Download the map image from the link
    response = requests.get("https://static.vecteezy.com/system/resources/previews/018/931/116/original/cartoon-map-icon-png.png")
    image_data = response.content

    # Configuration of the map image
    image = Image.open(BytesIO(image_data))
    image = image.resize((300, 300))  
    photo = ImageTk.PhotoImage(image)

    label = Label(root, image=photo)
    label.image = photo
    label.grid(row=0, column=4, rowspan=7, columnspan=4)

    root.mainloop()