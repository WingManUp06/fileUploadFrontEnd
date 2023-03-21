console.log("working")

let fileForm = document.getElementById("fileForm")
let fileInput = document.getElementById("fileInput")


fileForm.addEventListener("submit",  async (event) => {
    event.preventDefault()
    console.log("Submitted")
    const file = fileInput.files[0]
    console.log(file)

    // Get Url From Server
    const { url } = await fetch("/s3Url").then(res => res.json())
    console.log(url)
    // Post the image to the s3 bucket
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)
    // post request to store any other data
})

