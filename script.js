const form = document.getElementById("form");
const main = document.getElementById("main");
const search = document.getElementById("search");
const reposEl = document.getElementById("repos");

const API_URL="https://api.github.com/users/";

const h1 = document.createElement("h1");
h1.innerText="GitHub-Profiles - Most Starred Repos";
form.appendChild(h1);


async function getUserData(username){
    const response = await fetch(API_URL+username);
    const data = await response.json();
    showUser(data);
    getUserRepos(username);

}
async function getUserRepos(username){
    const response = await fetch(API_URL+username+"/repos");
    const data_repos = await response.json();
    showRepos(data_repos);
}


function showUser(user){

    main.innerHTML=`<img class="avatar" src="${user.avatar_url}" alt="" /> <h2>${user.name}</h2><p>Bio:${user.bio}</p><p>Followers:${user.followers}</p><p>Following:${user.following}</p><p>Public Repos:${user.public_repos}</p><p><b>Most starred Repos:</b></p>`

}

function showRepos(repos){
    if((repos.slice(0,10).filter((el)=>el.stargazer_count>0).length)>0){
    repos.sort((a,b)=>b.stargazers_count-a.stargazers_count)
        .slice(0,10)
        .forEach((el,index)=>{
            const anchor = document.createElement("a");
            anchor.classList.add("repos");
            anchor.href=el.html_url;
            anchor.target="_blank";
            anchor.innerText= (index+1)+")"+" "+el.name + "---" + el.description +"---"+el.language;
            main.appendChild(anchor);
        })
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const user=search.value ;
    if(user){
        getUserData(user);
        search.value=" ";
    }

})