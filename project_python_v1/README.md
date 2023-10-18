# Lógica do algoritmo de Dijkstra

Mostrando em python um exemplo de como esse algoritmo pode ser utilizado para traçar a menor distância entre dois pontos.

# Códigos Python:
- [dijkstra_path_graph](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/dijkstra_path_graph.py) - Gráfo do Algoritmo de Dijkstra

- [shortest_path_v1](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/shortest_path_v1.py) - Utilizando o Algoritmo de Dijkstra traça a menor rota entre localização de 'Origem' e uma ou mais localizações de 'Destino utilizando Latitude e Longitude

- [shortest_path_v2](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/blob/main/project_python_v1/shortest_path_v2.py) - Utilizando o Algoritmo de Dijkstra traça a menor rota entre localização de 'Origem' e uma ou mais localizações de 'Destino utilizando número, nome da rua, nome do bairro, nome da cidade e nome do país.


## Requerimentos

<pre>
#networkx==3.1  - Conexão entre pares de entidades (nós) através de arestas.
#numpy==1.26.1 - Operações eficientes em matrizes.
#matplotlib==3.8.0 - Plota o grafo.
#folium==0.14.0 - Criação de mapas interativos com Leaflet.js.
#geopy==2.4.0 - Cálcula a distância entre pontos geográficos.
#nominatim==0.1 - Converte endereços em coordenadas geográficas.
#osmnx==1.7.0  - Cria grafos de ruas direcionados.
</pre>   


### dijkstra_path_graph

| Grafo                                                                                                                                    | Representa as distâncias entre os nós do grafo.                                                                                               |
|------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/d7a5c054-25c6-4d1e-8a20-7f624bb70a2c" alt="Grafo Image"> | <img src="https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/cbb7d391-e41f-4176-a587-bc3b0c9a788c" alt="Distâncias Image"> |
|                                                                                                                                          |                                                                                                                                               |
|                                                                                                                                          |                                                                                                                                               |

Calcula o caminho mínimo usando o algoritmo de Dijkstra e determina os arcos no caminho mínimo e define suas cores.
![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/8527ba07-ae5c-4118-96eb-65547840cd93)


| Interface para receber o 'Nó Inicial' e 'Nó Final'.                                                                  | Grafo com o resultado do menor caminho entre o 'Nó Inicial' e o 'Nó Final'.                                          |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/05172cc6-4307-4950-929e-d6435b0579df) | ![image](https://github.com/BonathanRJ/TCC---Programa-de-Rotas/assets/97456370/118b02fe-467b-4453-8563-eb24505077fb) |
