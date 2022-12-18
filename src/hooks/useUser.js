import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
      setUser([]);
      setIsLoading(false);

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/user.json");

        if (response.status < 200 || response.status >= 400) {
          throw new Error("Something went wrong");
        }
        let data = await response.json();
        
        const [getUser] = Object.values(data).filter(u => u.id === auth.user.id)

        setUser(getUser);
        setIsLoading(true);
      } catch (error) {
        console.log(" 😣😣😣 FAILED FETCH DATA: ", error);
      }
    };

    fetchData();
  }, []);

  return [isLoading, user];
};
