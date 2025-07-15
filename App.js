import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaInicial from "./telas/TelaInicial";
import TelaLivros from "./telas/TelaLivros";
import TelaAdicionarLivro from "./telas/TelaAdicionarLivro";
import TelaAlterarLivro from "./telas/TelaAlterarLivro";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TelaInicial}
          options={{ title: "Sistema para Livrarias" }}
        />
        <Stack.Screen
          name="Books"
          component={TelaLivros}
          options={{ title: "Lista de Livros" }}
        />
        <Stack.Screen
          name="AddBook"
          component={TelaAdicionarLivro}
          options={{ title: "Adicionar Livro" }}
        />
        <Stack.Screen
          name="EditBook"
          component={TelaAlterarLivro}
          options={{ title: "Editar Livro" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
