const todosURL = "https://dummyjson.com/todos";
const userURL = "https://dummyjson.com/users";
const URLS = [todosURL, userURL];
var toDos = [];
var users = [];
var combinedData = [];
var gotUserData = false;
var gotData = false;
let render = false;

const firstCaller = () => {
  setInterval(() => {
    fetch(URLS[0]).then((value) =>
      value.json().then((resp) => {
        toDos = resp.todos;
        gotData = true;
      })
    );
  }, 3000);
};

const secondCaller = () => {
  fetchUserData();
  setInterval(() => {
    if (gotData) {
      if (!render) {
        renderData();
        combineDatas();
        console.log(combinedData);
      }
    } else {
      renderNoData();
    }
  }, 1000);
};

const fetchUserData = () => {
  fetch(URLS[1]).then((value) =>
    value.json().then((userData) => {
      users = userData.users;
      gotUserData = users;
    })
  );
};

const combineDatas = () => {
  for (let i = 0; i < toDos.length; i++) {
    users.map((user) => {
      if (toDos[i].userId === user.id) {
        let toStore = {
          id: toDos[i].id,
          task: toDos[i].todo,
          status: toDos[i].completed ? "Finished" : "Remained",
          users: `${users[i].firstName} + ${users[i].lastName}`,
        };
        combineDatas = toStore;
      }
    });
  }
};

const renderData = () => {
  let content = document.getElementById("content");

  let toWrite = "";
  for (let i = 0; i < toDos.length; i++) {
    toWrite += `
    <tr>
    <td>
    ${toDos[i].id}
    </td>
    <td>
    ${toDos[i].todo}
    </td>
    <td>
    ${toDos[i].completed ? "Finished" : "Left"}
    </td>
    <td>
    ${toDos[i].userId}
    </td>
    </tr>

    `;
    content.innerHTML = toWrite;
  }
  renderData = true;
};

const renderNoData = () => {
  const showContent = "No Data Was Found";
  let mainDiv = document.getElementById("content");
  mainDiv.innerHTML = `<p>${showContent} </p>`;
  console.log(showContent);
};

firstCaller();
secondCaller();
