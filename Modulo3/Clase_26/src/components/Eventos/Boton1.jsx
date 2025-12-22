/* export const Boton1 = () => {
  return <button onClick={() => console.log("Hice click")}>Click</button>;
};
 */

export const Boton1 = () => {
  const handleClick = () => {
    console.log("Hice Click");
  };

  return <button onClick={handleClick}>Click</button>;
};
