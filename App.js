//web 392535976541-6vq7hequf4dd9fp37kuqv2srrljemhuv.apps.googleusercontent.com
// android 392535976541-u9t0qp9jap45e8a3b9bup8g7ic1vgp7g.apps.googleusercontent.com


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import ProductCard from './unauth_product';
import AuthProductCard from './auth_product';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);


  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId:'392535976541-ir6vr8ohiitvjns77lemp7l8vnjq9tg8.apps.googleusercontent.com',
      webClientId: '392535976541-6vq7hequf4dd9fp37kuqv2srrljemhuv.apps.googleusercontent.com',
      androidClientId: '392535976541-u9t0qp9jap45e8a3b9bup8g7ic1vgp7g.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUser(userInfo);
        })
        .catch((error) => {
          console.log('Error fetching user info:', error);
        });
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      promptAsync();
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View>
    <View>
      <Text style={styles.text}>
        Product Card for Unauthorised Users
      </Text>
      <ProductCard/>
      </View>
      {user!=null ? (
        <View>
          <Text style={styles.text}>Product Card for Authorised Users</Text>
          <AuthProductCard/>
          <Button title="Logout" style={styles.button} onPress={handleLogout}/>
        </View>
      ) : (
        <Button title="Login with Google" onPress={handleLogin} styles={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop:30,
    fontSize:20,
    fontWeight:'bold',
  },
  image: {
    padding:50,
    width:400
  }
});