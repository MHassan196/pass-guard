// document.addEventListener('DOMContentLoaded', function() {
//     const themeToggle = document.getElementById('flexSwitchCheckDefault');
//     themeToggle.addEventListener('change', toggleTheme);
// });

let isDarkMode = false;

function toggleTheme() {
    const body = document.body;
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        body.classList.add('dark-mode');
        document.querySelector('.mode').innerHTML = "Enable Light Mode";
        document.querySelector('.table').classList.add('table-dark');
    } else {
        body.classList.remove('dark-mode');
        document.querySelector('.mode').innerHTML = "Enable Dark Mode";
        document.querySelector('.table').classList.remove('table-dark');
    }
}

function initializeTheme() {
    const themeToggle = document.getElementById('flexSwitchCheckDefault');

    themeToggle.addEventListener('change', toggleTheme);
}

initializeTheme();





const maskPassword = (pass) => {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*"
        
    }
    return str
}

const copyText = (txt) => {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById('copied').style.display = "inline";
            setTimeout(() => {
                document.getElementById('copied').style.display = "none";

            }, 2000);
        },
        () => {
            alert("Clipboard Copying Failed")
        }
    )
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully Deleted ${website}'s password`)
    showPassword();
}

const showPassword = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data To Show";
  } else {
    tb.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
        </tr>
    `
    let arr = JSON.parse(data)
    let str = ""
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        str += `
        <tr>
            <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy button" width="10" height="10" ></td>
            <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy button" width="10" height="10" ></td>
            <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy button" width="10" height="10" ></td>
            <td><button class="del-btn" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>
        `
        
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = ""
  username.value = ""
  password.value = ""
};

console.log("Working");
showPassword();
document.querySelector(".sub-btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
});
