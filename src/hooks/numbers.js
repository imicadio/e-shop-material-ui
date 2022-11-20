export const floorDown = (value) => Math.round(Math.floor(value));

export const inputBetweenNumber = (value, stock) => {
    const inputValue = parseInt(value.toString().replace(/[^0-9]/g, ""));

    if (inputValue > 0 && inputValue <= stock)
      return inputValue;
    else if (inputValue <= 0) return 1;
    else if (inputValue >= stock) return stock;
    else return '';
}