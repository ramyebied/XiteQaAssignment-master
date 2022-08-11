import {useQuery} from 'react-query';
import {sleep} from './utils';

const VIDEOS_DATA_URL =
  'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

function transformData({genres, videos}) {
  const genreIdsToNames = new Map();
  genres.forEach(genre => genreIdsToNames.set(genre.id, genre.name));

  const genresByName = genres.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.name]: {genreId: curr.id, genreName: curr.name, videos: []},
    }),
    {},
  );

  videos.forEach(video => {
    const videoGenreName = genreIdsToNames.get(video.genre_id);
    if (!videoGenreName) {
      return;
    }

    genresByName[videoGenreName].videos.push({
      artist: video.artist,
      id: video.id,
      imageUrl: video.image_url,
      releaseYear: video.release_year,
      title: video.title,
    });
  });

  return Object.values(genresByName);
}

export function useFetchedData({isUrlBroken}) {
  return useQuery(
    ['VIDEOS_DATA', isUrlBroken],
    async () => {
      await sleep(1000);
      const responseData = await fetch(
        isUrlBroken ? `${VIDEOS_DATA_URL}-broken` : VIDEOS_DATA_URL,
      );
      if (!responseData.ok) {
        throw new Error('Network response was not ok: ', responseData.status);
      }
      return transformData(await responseData.json());
    },
    {retry: 0},
  );
}
