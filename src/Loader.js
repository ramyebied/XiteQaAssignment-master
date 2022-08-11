import React from 'react';
import {ActivityIndicator, StyleSheet, View, ScrollView, Text, Image} from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export const Loader = ({isLoading}) => (
  <View style={styles.loaderContainer} pointerEvents={'none'}>
    <ActivityIndicator testID={'loader'} size={'large'} animating={isLoading} />
  </View>
);

