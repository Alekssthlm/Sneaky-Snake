
export async function getData() {
  try {
    let res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    let jokeEl = document.querySelector('#jokeEl');
    let data = await res.json();
    let joke = data.joke;
    jokeEl.textContent = `"${joke}"`;
    console.log(joke);
  } catch (error) {
    console.error(error);
  }
}

