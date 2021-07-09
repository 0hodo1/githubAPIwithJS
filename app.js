//Element Seçme

const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")
const github = new Github
const ui = new UI

eventListeners()

function eventListeners(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    document.addEventListener("DOMContentLoaded",getAllSearched)
}

function getData(e){
    let username = nameInput.value.trim()

    if (username === ""){
        alert("Bir kullanıcı adı girin")
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found"){
                console.log("Geçersiz kullanıcı adı");
                ui.showError("Kullanıcı bulunamadı")
            }
            else {
                ui.addSearchUserToUI(username)
                Storage.addSearchedUserToStorage(username)
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showUserInfo(err))
    }

    ui.clearInput()
    e.preventDefault()
}

function clearAllSearched(){

    if (confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage()
        ui.clearAllSearchedFromUI()
    }
}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage()

    let result = ""
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    })

    lastUsers.innerHTML = result
}