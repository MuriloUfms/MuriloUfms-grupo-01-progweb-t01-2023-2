import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Ranking.css";

interface UserData {
  uid: string;
  username: string;
  hits: number;
}

export function Ranking() {
  const [ranking, setRanking] = useState<UserData[]>([]);
  const [userData, setUserData] = useState<UserData>();
  const [currentUser] = useAuthState(auth);

  useEffect(() => {
    async function getUsersData() {
      const usersCollection = collection(db, "users");
      const usersSnap = await getDocs(
        query(usersCollection, where("hits", ">", 0))
      );
      const usersData = usersSnap.docs.map((doc) => doc.data()) as UserData[];

      usersData.sort((a, b) => {
        if (a.hits > b.hits) {
          return -1;
        }
        if (a.hits < b.hits) {
          return 1;
        }
        return 0;
      });

      setUserData(usersData.find((user) => user.uid === currentUser?.uid));
      setRanking(usersData);
    }
    getUsersData();
  }, [currentUser]);

  return (
    <>
      <div className="user">
        <div className="user-info">
          <span className="user-info-username">{userData?.username}</span>
          <span className="user-info-score">Score: {userData?.hits}</span>
        </div>
      </div>
      <div className="ranking">
        <h2 className="ranking-title">Ranking</h2>
        <ol className="ranking-list">
          {ranking.map((user, index) => (
            <li key={index} className="ranking-list-item">
              <span>{user.username}</span>
              <span>{user.hits}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
