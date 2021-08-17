const addpostFormHandler = async(event) => {
    event.preventDefault();

    const user = document.querySelector("#user-addpost").value.trim();
    const text = document.querySelector("#newpost-text").value.trim();


    console.log(user);
    console.log(text);


    if (user && text) {
        const response = await fetch("/api/users/addpost", {
            method: "POST",
            body: JSON.stringify({ user, text }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to add post.");
        }
    }
};

document
    .querySelector(".addpost-form")
    .addEventListener("submit", addpostFormHandler);