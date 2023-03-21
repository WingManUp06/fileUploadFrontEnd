console.log("working")
// Elements for getting data out of the form
let fileForm = document.getElementById("fileForm")
let fileInput = document.getElementById("fileInput")

// For displaying the image
let imageContainer = document.querySelector(".image-container")


fileForm.addEventListener("submit",  async (event) => {
    event.preventDefault()
    console.log("Submitted")
    const file = fileInput.files[0]
    console.log(file.type)
    // I was trying to change the file extension
    // let fileExt = await findFileType(file.type)
    // if(fileExt === null){
    //     window.alert("You cant have that type of file here")
    //     return;
    // }
    // console.log("the function is not done")
    // console.log(fileExt)
    // Get Url From Server

    let { url } = await fetch("/s3Url").then(res => res.json())


    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: file
    })

    const imageUrl = url.split("?")[0]
    console.log(imageUrl)

    const img = document.createElement("img")
    img.src = imageUrl
    img.classList.add("image")
    imageContainer.appendChild(img)
    // post request to store any other data
})

// async function findFileType(fileType){
//     let fileExt;
//     switch(fileType){
//         case fileType = "image/png":
//             fileExt = ".png"
//             break;
//         case fileType = "image/jpeg":
//             fileExt = ".jpg"
//             break;
//         default:
//             fileExt = null
//     }

//     return fileExt;
// }