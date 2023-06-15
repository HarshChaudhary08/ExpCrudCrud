let form = document.getElementById("form")
form.addEventListener("submit",saveToLocalStorage)


function saveToLocalStorage(e){
    e.preventDefault()
 
    let newExpense = document.getElementById("name").value
    let newDes = document.getElementById("description").value
    let newlist = document.getElementById("list").value

    let obj = {
      newExpense,
      newDes,
      newlist,
    };

    axios.post("https://crudcrud.com/api/a35bbd55ca894f24ac7fc677bedc870b/Exp",obj)
    .then((response) => {
        console.log(response.data);
        showNewUserOnScreen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });


}



function showNewUserOnScreen(user){
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    document.getElementById("list").value = ""

    if(localStorage.getItem(user.newExpense)!== null){
removeUserFromScreen(user.newExpense)
    }
    const ul = document.getElementById("listOfitems")
    const li = `<li id = ${user._id}> 
    ${user.newExpense} - ${user.newDes} - ${user.newlist}


    <button onclick = deleteUser('${user._id}')> Delete
    </button>

    <button onclick = editUserDetails('${user.newExpense}','${user.newDes}','${user.newlist}','${user._id}')> Edit
    </button>
    </li>
    `

    ul.innerHTML+= li
}


function deleteUser(userId){
    console.log(userId)

    axios.delete(`https://crudcrud.com/api/a35bbd55ca894f24ac7fc677bedc870b/Exp/${userId}`)
    .then((response)=>{
        removeUserFromScreen(userId)
    })
    .catch((error)=>{
        console.log(error)
    })
}


function editUserDetails(newExpense,newDes,newlist,userId){
    document.getElementById("name").value = newExpense
    document.getElementById("description").value = newDes
    document.getElementById("list").value = newlist
    deleteUser(userId)
}


function removeUserFromScreen(userId){
    const ul = document.getElementById("listOfitems")
    const toDelete = document.getElementById("userId")
    if(toDelete){
ul.removeChild(toDelete)
    }
    console.log(userId)
}


window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/a35bbd55ca894f24ac7fc677bedc870b/Exp")
      .then((resolve) => {
        console.log(resolve.data);
        for (let i = 0; i < resolve.data.length; i++) {
            showNewUserOnScreen(resolve.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });