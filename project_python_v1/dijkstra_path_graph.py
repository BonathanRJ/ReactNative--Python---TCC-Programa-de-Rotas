import networkx as nx 
import numpy as np 
import matplotlib.pylab as plt
import tkinter as tk
from tkinter import Label, Entry, Button

def encontrar_caminho():
    no_inicial = int(entrada_inicial.get())
    no_final = int(entrada_final.get())

    caminho_minimo = nx.dijkstra_path(G, no_inicial, no_final)

    arcos_caminho = [(caminho_minimo[i], caminho_minimo[i+1]) for i in range(len(caminho_minimo)-1)]

    cor_dos_arcos = []
    for arco in G.edges():
        if arco in arcos_caminho:
            cor_dos_arcos.append("red")
        else:
            cor_dos_arcos.append("black")

    nx.draw_networkx(G, pos=posicoes_dos_nos, node_color='white', edgecolors='black', edge_color=cor_dos_arcos)
    plt.show()

# Matriz de distâncias
distancias = [[0, 18, 32, 0, 0, 0],
              [18, 0, 28, 12, 0, 0],
              [32, 28, 0, 17, 4, 17],
              [0, 12, 17, 0, 0, 32],
              [0, 0, 4, 0, 0, 11],
              [0, 0, 17, 32, 11, 0]]

G = nx.from_numpy_array(np.array(distancias))

# Coordenadas dos nós
posicoes_dos_nos = {0: [0, 1], 1: [1, 2], 2: [2, 0], 3: [3, 2], 4: [3, 0], 5: [5, 1]}


# Iniciar a interface
if __name__ == "__main__":
    root = tk.Tk()
    root.title("Encontrar Caminho Mínimo")

    # Definir o tamanho da tela
    root.geometry("330x90")

    # Entradas para nós inicial e final
    Label(root, text="Nó Inicial:").grid(row=0, column=0, sticky='e')
    Label(root, text="Nó Final:").grid(row=1, column=0, sticky='e')

    entrada_inicial = Entry(root)
    entrada_final = Entry(root)

    entrada_inicial.grid(row=0, column=1, sticky='w')
    entrada_final.grid(row=1, column=1, sticky='w')

    # Botão para encontrar o caminho mínimo
    botao_encontrar_caminho = Button(root, text="Encontrar Caminho Mínimo", command=encontrar_caminho)
    botao_encontrar_caminho.grid(row=2, column=0, columnspan=2, pady=5, padx=80)


    root.mainloop()