import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const AuthProductCard = ({ title, price, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202211/iphone_15_1-one_one_0.jpg?VersionId=9SXvA92iozGaChGDPBb7I.rynGQB14eI'}} style={styles.image} />
      <Text style={styles.title}>IPhone</Text>
      <Text style={styles.price}>Price:Rs 110000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '40%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
    marginLeft:12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#888888',
  },
});

export default AuthProductCard;