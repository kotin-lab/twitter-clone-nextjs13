import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import News from "./News";

export default function NewsWidget() {
  const [articleNum, setArticleNum] = useState(3);
  const [newsResults, setNewsResults] = useState([]);

  // Effects
  useEffect(() => {
    async function fetchNews() {
      const url = 'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json';
      const response = await fetch(url);
      const results = await response.json();

      setNewsResults(results.articles);
    }

    fetchNews();
  }, []);
  
  return newsResults.length > 0 && (
    <div className="text-gray-700 bg-gray-100 rounded-xl pt-4">
      <h4 className="font-bold text-xl px-4 mb-3">What&apos;s happening?</h4>
      <AnimatePresence>
        {newsResults.slice(0, articleNum).map(article => (
          <motion.div
            key={article.url}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <News article={article} />
          </motion.div>
        ))}
      </AnimatePresence>
      {articleNum < newsResults.length && (
        <button 
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-blue-300 hover:text-blue-400 pl-4 pb-3 mt-3"
        >
          Show more
        </button>
      )}
    </div>
  )
}
