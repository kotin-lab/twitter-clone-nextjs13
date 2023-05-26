// Components
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default async function Home() {
  // https://saurav.tech/NewsAPI/top-headlines/category/health/in.json
  const url = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json';
  const response = await fetch(url);
  const newsResults = await response.json();

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />
      
      {/* Widgets */}
      <Widgets newsResults={newsResults.articles} />
      
      {/* Modal */}
    </main>
  )
}
