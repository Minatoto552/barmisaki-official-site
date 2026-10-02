import { HomeClient } from './home-client';
import { getManagedData } from './managed-data';
import { latestAlbumPhotos, loadAlbums } from './album/album-data';

export default async function Home() {
  const [data, albums] = await Promise.all([getManagedData(), loadAlbums()]);
  const latestPhotos = latestAlbumPhotos(albums);

  return (
    <HomeClient
      casts={data.casts}
      news={data.news}
      initialHeroPhotos={latestPhotos.length ? latestPhotos : ['/album/latest-album-fallback.jpg']}
    />
  );
}
