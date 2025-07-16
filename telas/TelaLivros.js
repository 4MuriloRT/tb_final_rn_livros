import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  TextInput,
  Image,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://192.168.1.100:8800/books"; // ATENÇÃO: pegar o ip atual

export default function TelaLivros({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros: ", error);
        Alert.alert("Erro", "Não foi possível carregar os livros.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
      setSearchId("");
    }, [])
  );

  const handleDeleteBook = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar este livro ?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => {
            axios
              .delete(`${API_URL}/${id}`)
              .then(() => {
                Alert.alert("Sucesso", "Livro deletado com sucesso! ");
                fetchBooks();
              })
              .catch((error) => {
                console.error("Erro ao deletar livro: ", error);
                Alert.alert("Erro", "Não foi possível deletar o livro. ");
              });
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleSearchBook = () => {
    if (!searchId.trim()) {
      fetchBooks();
      return;
    }
    setLoading(true);
    axios
      .get(`${API_URL}/${searchId}`)
      .then((response) => {
        setBooks(response.data ? [response.data] : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar livro:", error);
        Alert.alert("Erro", "Livro não encontrado. ");
        setBooks([]);
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar livro pelo ID"
          value={searchId}
          onChangeText={setSearchId}
          keyboardType="numeric"
        />
        <Button title="Buscar" onPress={handleSearchBook} />
      </View>

      <View style={styles.addButtonContainer}>
        <Button
          title="Adicionar Novo Livro"
          onPress={() => navigation.navigate("AddBook")}
        />
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.cover }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookDescription}>{item.des}</Text>
              <View style={styles.containerPriceId}>
                <Text style={styles.bookPrice}>R$ {item.price}</Text>
                <Text style={styles.bookId}>ID: {item.id}</Text>
              </View>

              <View style={styles.buttonsContainer}>
                <Button
                  title="Alterar"
                  onPress={() =>
                    navigation.navigate("EditBook", { book: item })
                  }
                />
                <Button
                  title="Deletar"
                  color="#ff4d4d"
                  onPress={() => handleDeleteBook(item.id)}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}> Nenhum livro encontrado. </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButtonContainer: {
    marginBottom: 16,
  },
  bookItem: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  containerPriceId:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bookCover: {
    width: 80,
    height: 120,
    resizeMode: "cover",
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#888",
  },
});
