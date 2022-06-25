import classes from "./Header.module.css";
import mealImage from "../../assets/meals.jpg";
import HeaderButton from "./HeaderButton";
const Header = props => {
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious Meals</h1>
        <HeaderButton onClick={props.onToggleCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="MealImage" />
      </div>
    </>
  );
};

export default Header;
