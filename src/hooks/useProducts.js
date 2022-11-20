import { useEffect, useState } from "react";

export const useProducts = (count) => {
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
      setSlides([]);
      setIsLoading(false);

      try {
        const response = await fetch(
          "https://react-shop-dd1d1-default-rtdb.europe-west1.firebasedatabase.app/products.json"
        );

        if (response.status < 200 || response.status >= 400) {
          throw new Error("Something went wrong");
        }
        let data = await response.json();

        if(count) data = data.slice(0, count);        
        setSlides(data)
        setIsLoading(true);        
      }
      catch(error) {
         console.log(" 😣😣😣 FAILED FETCH DATA: ", error)
      }
    };

    fetchData();
  }, []);

  return [isLoading, slides];
};
