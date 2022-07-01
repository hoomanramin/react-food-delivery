import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Available.module.css";
import MealItem from "./MealItem/MealItem";

const Available = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-request-974a4-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("Can not connect to server");
      }
      const resData = await res.json();

      let loadedData = [];
      for (const key in resData) {
        loadedData.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setIsLoading(false);
      setMeals(loadedData);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p style={{ color: "white", textAlign: "center" }}>...Loading</p>;
  }
  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default Available;
