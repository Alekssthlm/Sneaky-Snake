export async function getData() {
  try {
    let response = await fetch(`${process.env.JOKE_API}`);
    let joke = await response.json()
    let jokeEl = document.querySelector('#jokeEl');
    jokeEl.textContent = `"${joke}"`;
  } catch (error) {
    console.error(error);
  }
}
