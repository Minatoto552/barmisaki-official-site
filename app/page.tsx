import { HomeClient } from './home-client';
import { getManagedData } from './managed-data';
import { latestAlbumPhotos, loadAlbums } from './album/album-data';

export default async function Home() {
  const [data, albums] = await Promise.all([getManagedData(), loadAlbums()]);

  return (
    <HomeClient
      casts={data.casts}
      news={data.news}
      initialHeroPhotos={latestAlbumPhotos(albums)}
    />
  );
}
