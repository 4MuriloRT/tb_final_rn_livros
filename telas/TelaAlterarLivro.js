import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.1.100:8800/books"; // ATENÇÃO: pegar o ip atual

export default function TelaAlterarLivro({ route, navigation }) {
  const { book } = route.params; 

  const [title, setTitle] = useState(book.title);
  const [des, setDes] = useState(book.des);
  const [price, setPrice] = useState(book.price.toString());
  const [cover, setCover] = useState(book.cover);

  const handleUpdateBook = () => {
    if (!title || !des || !price || !cover) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    axios.put(`${API_URL}/${book.id}`, { title, des, price: parseFloat(price), cover })
      .then(() => {
        Alert.alert('Sucesso', 'Livro alterado com sucesso!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Erro ao alterar livro:', error);
        Alert.alert('Erro', 'Não foi possível alterar o livro.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descrição" value={des} onChangeText={setDes} />
      <TextInput style={styles.input} placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="URL da Capa" value={cover} onChangeText={setCover} />
      <Button title="Salvar Alterações" onPress={handleUpdateBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});