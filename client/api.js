export async function getData() {
  try {
    let response = await fetch(`https://sneaky-snake-server.vercel.app`);
    let joke = await response.json()
    let jokeEl = document.querySelector('#jokeEl');
    jokeEl.textContent = `"${joke}"`;
  } catch (error) {
    console.error(error);
  }
}
