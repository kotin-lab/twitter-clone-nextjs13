import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RandomUsersWidget() {
  const [randomUserNum, setRandomUserNum] = useState(3);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {      
      const randomUsersUlr = 'https://randomuser.me/api/?results=50&inc=name,login,picture';
      const randomUsersResponse = await fetch(randomUsersUlr);
      const randomUserResults = await randomUsersResponse.json();

      setRandomUsers(randomUserResults.results);
    }

    fetchUsers();
  }, []);

  return randomUsers.length > 0 && (
    <div className="sticky top-16 text-gray-700 bg-gray-100 rounded-xl pt-4">
      <h4 className="font-bold text-xl px-4 mb-3">Who to follow</h4>
      <AnimatePresence>
        {randomUsers.slice(0, randomUserNum).map(user => (
          <motion.div
            key={user.login.uuid}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
          >
            <div className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-200 transition duration-200 ease-in-out cursor-pointer">
              <img 
                src={user.picture.thumbnail}
                alt="user image"
                width='40'
                height='40'
                className='rounded-full'
              />
              <div className="flex-1">
                <h4 className="font-bold text-sm truncate hover:underline">{user.login.username}</h4>
                <h5 className="truncate text-[13px] text-gray-500">{user.name.first + ' ' + user.name.last}</h5>
              </div>
              <button className="bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">Follow</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {randomUserNum < randomUsers.length && (
        <button 
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="text-blue-300 hover:text-blue-400 pl-4 pb-3 mt-3"
        >
          Show more
        </button>
      )}
    </div>
  );
}
