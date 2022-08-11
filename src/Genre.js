import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TILE_SIZE = 150;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {fontWeight: '500', fontSize: 16, padding: 4},
  videoContainer: {
    height: TILE_SIZE,
    width: TILE_SIZE,
    marginHorizontal: 4,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: TILE_SIZE,
    width: TILE_SIZE,
    position: 'absolute',
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
  },
  videoArtist: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
  },
  videoYear: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: 'rgba(0,0,0,0.8)',
    textAlign: 'right',
    padding: 4,
  },
  emptyContainer: {
    paddingHorizontal: 4,
    paddingVertical: 16,
  },
});

const Video = React.memo(
  ({title, releaseYear, imageUrl, artist, openModal}) => {
    const source = useMemo(() => ({uri: imageUrl}), [imageUrl]);

    const onPress = useCallback(() => openModal(title), []);

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ImageBackground
          source={source}
          style={styles.videoContainer}
          resizeMode={'cover'}>
          <Text style={styles.videoTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.videoArtist} numberOfLines={1}>
            {artist}
          </Text>
          <Text style={styles.videoYear} numberOfLines={1}>
            {releaseYear}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  },
);

export const Genre = ({name, videos, openModal}) => {
  const renderVideo = useCallback(
    ({item: {title, artist, id, imageUrl, releaseYear}}) => (
      <Video
        key={id}
        title={title}
        releaseYear={releaseYear}
        imageUrl={imageUrl}
        artist={artist}
        openModal={openModal}
      />
    ),
    [openModal],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <FlatList horizontal data={videos} renderItem={renderVideo} />

      {videos.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text>No items found</Text>
        </View>
      )}
    </View>
  );
};
