import React, {memo, useCallback, useState} from 'react';
import {Button, Image, StyleSheet, Text,ScrollView, View} from 'react-native';
import { scroller } from "react-scroll";

import {Loader} from './Loader';
import {testIDs} from './testUtils';
import {useFetchedData} from './useFetchedData';
import {VideoList} from './VideoList';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  noDataImage: {
    maxWidth: '50%',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export const MainScreen = memo(function MainScreen({}) {
  const [isUrlBroken, setIsUrlBroken] = useState(false);

  const {error, data, isLoading, isRefetching, refetch} = useFetchedData({
    isUrlBroken,
  });

  const toggleAppBroken = useCallback(
    () => setIsUrlBroken(isBroken => !isBroken),
    [],
  );

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>❌ Network error</Text>
          <Button
            title={'Fix the app'}
            testID={'fix_the_app'}
            onPress={toggleAppBroken}
            disabled={isLoading}
          />
        </View>

        {!isLoading && (
          <View style={styles.center}>
            <Image
              source={require('../assets/no-data-icon.png')}
              style={styles.noDataImage}
              resizeMode={'contain'}
            />
          </View>
        )}

        <Loader isLoading={isLoading} />
      </View>
    );
  }

  let title;
  if (isRefetching) {
    title = 'Refetching';
  } else {
    title = isLoading ? 'Loading...' : '✅ Network call succeeded';
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{title}</Text>
        <Button
          title={'Break the app'}
          testID={'break_app_button'}
          onPress={toggleAppBroken}
          disabled={isLoading}
          color={'#aa2222'}
        />
      </View>

      {!isLoading && (
        <VideoList data={data} isRefreshing={isLoading} refresh={refetch} />
      )}

      <Loader isLoading={isLoading} />
    </View>
  );

});
