// Get
const onLoad = async () => {
  //weatherAPI
  const temp = document.getElementById("temp");
  const weatherData = await (
    await fetch("http://spartacodingclub.shop/sparta_api/weather/seoul")
  ).json();
  temp.innerText = weatherData.temp;

  // commentAPI
  const { comments } = await (await fetch("/guestbook")).json();
  const commentList = document.getElementById("comment-list");
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>${c.comment}</p>
                <footer class="blockquote-footer">${c.nickname}</footer>
            </blockquote>
        </div>
    `;
    commentList.append(div);
  });
};

document.addEventListener("DOMContentLoaded", onLoad);

// Post
const form = document.querySelector(".mypost");

const onSubmit = async (e) => {
  e.preventDefault();
  const {
    currentTarget: { nickname, comment },
  } = e;

  const formData = new FormData();
  formData.append("nickname", nickname.value);
  formData.append("comment", comment.value);

  const { msg } = await (
    await fetch("/guestbook", { method: "POST", body: formData })
  ).json();
  console.log(msg);
};

form.addEventListener("submit", onSubmit);
