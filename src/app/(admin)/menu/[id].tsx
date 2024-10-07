import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { Link, useNavigation, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const product = products.find((p) => p.id.toString() === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product ? product.name : "Menu",
      headerRight: () => (
        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    });
  }, [navigation, product, id]);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProductDetailsScreen;
