import { getPageContent } from '@/api-client';
import Page from '@/components/page';

export default async function Home() {
  const pageContent = await getPageContent('home');
  return (
    <Page coverImg={pageContent.coverImg} heading1={pageContent.heading1} heading2={pageContent.heading2}>
      {pageContent.content}
    </Page>
  );
}
