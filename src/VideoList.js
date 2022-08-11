import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Modal,
  Button,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {Genre} from './Genre';
import {testIDs} from './testUtils';

const MODAL_SHOW_DURATION = 5 * 1000;

const styles = StyleSheet.create({
  wrapper: {height: '100%'},
  container: {paddingVertical: 16, flexGrow: 1},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#333333',
  },
  modalText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 36,
    padding: 24,
    textAlign: 'center',
  },
});

export const VideoList = function VideoList({data, isRefreshing, refresh}) {
  const modalVisibleTimeout = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const [selectedGenre, setSelectedGenre] = useState(null);

  const openModal = useCallback(title => {
    setModalVisible(true);
    setModalTitle(title);
    modalVisibleTimeout.current = setTimeout(() => {
      setModalVisible(false);
      setModalTitle('');
    }, MODAL_SHOW_DURATION);
  }, []);

  const closeModal = useCallback(title => {
    clearTimeout(modalVisibleTimeout.current);
    setModalVisible(false);
    setModalTitle(title);
  }, []);

  // clears the timout when the component unmounts
  useEffect(() => () => clearTimeout(modalVisibleTimeout.current), []);

  const filteredGenres = useMemo(
    () =>
      selectedGenre
        ? data.filter(({genreId}) => genreId === selectedGenre)
        : data,
    [data, selectedGenre],
  );

  return (
    <>
      <View style={styles.wrapper}>
        <Picker
          testID={'genre_picker'}
          placeholder={'Select a genre'}
          selectedValue={selectedGenre}
          onValueChange={itemValue => setSelectedGenre(itemValue)}>
          <Picker.Item label={'All genres'} value={null} />
          {data.map(({genreName, genreId}) => (
            <Picker.Item key={genreId} label={genreName} value={genreId} />
          ))}
        </Picker>

        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
              testID={'refresh_loader'}
            />
          }>
          {filteredGenres.map(({genreName, genreId, videos}) => (
            <Genre
              key={genreId}
              name={genreName}
              videos={videos}
              openModal={openModal}
            />
          ))}
        </ScrollView>
      </View>

      <Modal
        presentationStyle={'pageSheet'}
        animationType="slide"
        visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText} testID={'modal_title'}>
            {modalTitle}
          </Text>
          <Button
            title={'Close modal'}
            onPress={closeModal}
            color={Platform.OS === 'ios' ? '#aaffff' : '#aa2222'}
            testID={'close_modal_button'}
          />
        </View>
      </Modal>
    </>
  );
};
