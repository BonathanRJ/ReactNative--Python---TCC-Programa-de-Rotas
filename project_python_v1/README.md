# Lógica do algoritmo de Dijkstra

Mostrando em python um exemplo de como esse algoritmo pode ser utilizado para traçar a menor distância entre dois pontos.

# Códigos Python:
- [dijkstra_path_graph](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/dijkstra_path_graph.py) - Gráfo do Algoritmo de Dijkstra.

- [shortest_path_v1](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/shortest_path_v1.py) - Utilizando o Algoritmo de Dijkstra para traçar a menor rota entre coordenada de 'Origem' e uma ou mais coordenadas de 'Destino utilizando Latitude e Longitude.

- [shortest_path_v2](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/shortest_path_v2.py) - Utilizando o Algoritmo de Dijkstra para traçar a menor rota entre um endereço de 'Origem' e uma ou mais endereços de 'Destino' utilizando número, nome da rua, nome do bairro, nome da cidade e nome do país.


### Requerimentos

<pre>
#networkx==3.1       - Conexão entre pares de entidades (nós) através de arestas.
#numpy==1.26.1       - Operações eficientes em matrizes.
#matplotlib==3.8.0   - Plota o grafo.
#folium==0.14.0      - Criação de mapas interativos com Leaflet.js.
#geopy==2.4.0        - Cálcula a distância entre pontos geográficos.
#nominatim==0.1      - Converte endereços em coordenadas geográficas.
#osmnx==1.7.0        - Cria grafos de ruas direcionados.
</pre>   


## dijkstra_path_graph

| Grafo                                                                                                                | Matriz das distâncias entre os nós do grafo.                                                                         |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/9ea9697f-eb90-465c-bc8a-cd8150994ffd) | ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/f993c0af-3031-4270-bfd3-2611e4602c82) |

| Função para calcular o caminho mínimo usando o algoritmo de Dijkstra e determina os arcos no caminho mínimo e define suas cores.  |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/e7f4a027-1189-4fd9-affd-4bd756a69280) |

| Interface para receber o 'Nó Inicial' e 'Nó Final'.                                                                  | Grafo com o resultado do menor caminho entre o 'Nó Inicial' e o 'Nó Final'.                                          |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/5da62040-a4c2-4cd0-942f-08d9c112d820) | ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/118b02fe-467b-4453-8563-eb24505077fb) |


## shortest_path_v1.py - Latitude e Longitude

| Interface para receber Latitude e Longitude de Origem, permite preencher quantos Destinos vai querer e preencher a Latitude e Longitude do(s) Destino(s) |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/faba96f3-eae5-4e53-afba-029817d970a1)                                     |

| Função 'gerar_caminho' é acionada recebendo as informações da tela                                                   |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/010343bc-37cf-40bb-900a-c059cde62ad8) |

| Função 'generate_path' obtem os caminhos.                                                                            |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/bd6fbb94-1d32-4803-a43b-fe79fff4b8cd) |

| Função 'plot_map' para plotar o mapa usando a biblioteca Folium.                                                     |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/0cc095ce-b7c7-42e9-b8a6-447c7f3bbb8a) |

| Resultado da geração do mapa - Latitude e Longitude                                                                  |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/89c508ea-a9ca-4126-ac1c-99479df0add7) |


## shortest_path_v2.py - Endereço

| Interface para receber um endereço de origem e diversos endereços de destino. Os endereços deverão ser no formato: Número da rua, Nome da Rua, Nome do Bairro, Nome da Cidade e Nome do País, todos separados por ','. |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/c9d8deab-8963-416e-89d5-a2c412840a6d)                                                                                                   |

| Função 'get_coordinates_from_address' obtém coordenadas geográficas a partir de um endereço usando o serviço Nominatim. |
|-------------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/adb89321-4fe6-46e4-b97e-9893b6c5c1a5)    |

| Função 'generate_path' gera o caminho mais curto entre um ponto de origem e múltiplos destinos usando dados do OpenStreetMap. |
|-------------------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/486ae9d4-4264-465e-8bf6-f5062730a6fe)          |

| Função 'plot_map' para plotar o mapa usando a biblioteca Folium.                                                     |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/14b6e1b2-3907-405c-ac7b-152046ec29d3) |

| Resultado da geração do mapa - Endereço                                                                              |
|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/818904d6-fe90-4a84-b1c0-f7488d0c728b) |
