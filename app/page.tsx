import { HomeClient } from './home-client';
import { getManagedData } from './managed-data';

export const dynamic = 'force-dynamic';
export default async function Home() { const data = await getManagedData(); return <HomeClient casts={data.casts} news={data.news} />; }
