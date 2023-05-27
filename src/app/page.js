// Components
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default async function Home() {
  // https://saurav.tech/NewsAPI/top-headlines/category/health/in.json
  const newsUrl = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json';
  const newsResponse = await fetch(newsUrl);
  const newsResults = await newsResponse.json();

  const randomUsersUlr = 'https://randomuser.me/api/?results=50&inc=name,login,picture';
  const randomUsersResponse = await fetch(randomUsersUlr);
  const randomUserResults = await randomUsersResponse.json();

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />
      
      {/* Widgets */}
      <Widgets newsResults={newsResults.articles} randomUsers={randomUserResults.results} />
      
      {/* Modal */}
    </main>
  )
}
