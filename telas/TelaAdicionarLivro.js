import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.3.40:8800/books"; // ATENÇÃO: pegar o ip atual

const TelaAdicionarLivro = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("");

  const handleAddBook = () => {
    if (!title || !des || !price || !cover) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    axios
      .post(API_URL, { title, des, price: parseFloat(price), cover })
      .then(() => {
        Alert.alert("Sucesso", "Livro adicionado com sucesso.",
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      })
      .catch((error) => {
        console.error("Erro ao adicionar livro: ", error);
        Alert.alert("Erro", "Não foi possível adicionar o livro.");
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={des}
        onChangeText={setDes}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Capa"
        value={cover}
        onChangeText={setCover}
      />
      <Button title="Adicionar Livro" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default TelaAdicionarLivro;
