document.getElementById("submitComment").addEventListener("submit", async (event) => {
    const form = document.getElementById("submitComment");
    event.preventDefault(); // stop page reload chatyee pt hideo kojim
    await submitComment(form);
    form.reset()
    await loadComments()
});

async function submitComment(form) {
  var finalResponse
  try{
    const comment = new FormData(form)

    const jsonCommentData = Object.fromEntries(comment.entries());

    const jsonCommentString = JSON.stringify(jsonCommentData)

    const response = await fetch("http://localhost:5000/sendcomment", {method: "POST", headers: {"Content-Type": "application/json"},body: jsonCommentString})
    
    const data = await response.json()

    finalResponse = data.status // {status : x}
  }catch(error){
    console.error(error)
  }
}

async function loadComments() {
    try {
        const response = await fetch("http://localhost:5000/getcomments");
        const comments = await response.json();

        const container = document.getElementById("actualComments");
        container.innerHTML = "";

        comments.forEach(comment => {
            const div = document.createElement("div");
            div.classList.add("comment");

            div.innerHTML = `<p>${comment.content}</p>`;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading comments:", error);
    }
}