import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
 
const App = () => { // Serve para dizer quem é o aplicativo principal
  const [produto, setProduto] = useState([]); // Criando um array que tera 2 estado, uma inicial e outra para atualizar
  //nesse caso para mudar o valor é necessário utilizar a função setProduto
  const [inputValue, setInputValue] = useState(''); // Serve para mudar o estado do input - inputValue
  //Armazena o valor atual do campo de entrada. - setInputValue valor que será modificado futuramente
  const [editIndex, setEditIndex] = useState(null); // é uma função para editar a informação no input -
  //o editIndex é o valor inicial que é nulo - SetEditIndex função  que modifica o valor de editIndex.
 
  const addOrUpdateItem = () => { //delcaração da função
    if (editIndex !== null) { // se o indice for diferente de nulo
      const updatedProduto = produto.map((item, index) => //criação de uma constante que armazena o resultado
      //da operação de mapeamento. - MAP cria um novo array com o Item e o indíce
 
        index === editIndex ? inputValue : item //se o index atual for igual ao que deseja editar
        // ele retorna inputValue, novo valor
      );
      setProduto(updatedProduto);//serve para atualizar o novo produto
      setEditIndex(null);//retorna null, dizendo que não tem nehum item em edição
    } else {//esse else quer dizer que a pessoa não está editando e sim adicionando um novo item
      setProduto([...produto, inputValue]);//cria um novo array com os mesmo componentes que o original e o
      //inputValue serve para acrescentar o novo produto no final
    }
    setInputValue('');//limpa o campo de entrada
  };
 
  const editItem = (index) => { //função que recebe um parâmetro index, que representa o índice do item
    //que o usuário deseja editar no array produto.
    setInputValue(produto[index]);//define o valor do campo de entrada (inputValue) para o valor do item que
    //está sendo editado.
    setEditIndex(index);//Esta linha atualiza o estado editIndex para o índice do item que está sendo editado.
  };
 
  const deleteItem = (index) => {//função para deletar
    Alert.alert(//criar um alert
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },//testo que irá paracer
        { text: "OK", onPress: () => {//janela com o botão ok
          const updatedProduto = produto.filter((_, i) => i !== index);//criando um novo array, mas retira
          //o indice selecionado. _ nome, i indice
          setProduto(updatedProduto);//atualiza o array onde se localiza os produtos
        }},
      ]
    );
  };
 
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite um item"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TouchableOpacity onPress={addOrUpdateItem} style={{ marginBottom: 10, backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {editIndex !== null ? "At" : "Adicionar"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={produto} // Corrigido para 'data' em vez de 'produto'
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <Text>{item}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => editItem(index)} style={{ marginRight: 10 }}>
                <Text style={{ color: 'blue' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Text style={{ color: 'red' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
 
export default App;