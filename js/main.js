var siteName = document.getElementById("sitename");
var siteUrl = document.getElementById("siteurl");
var addBtn = document.getElementById("btnsubmit");

var siteList;

if (localStorage.getItem("site") !== null) {
  siteList = JSON.parse(localStorage.getItem("site"));
  displaySite();
} else {
  siteList = [];
}

addBtn.onclick = function addSite(e) {
  e.preventDefault();
  var site = {
    sName: siteName.value,
    sUrl: siteUrl.value,
  };
  var res = site.sUrl.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) {
    document.getElementById("overlay").classList.toggle("show-pop");
  } else {
    siteList.push(site);
    localStorage.setItem("site", JSON.stringify(siteList));
    displaySite();
    resetForm();
    console.log(siteList);
  }
};

function displaySite() {
  var box = "";
  for (var i = 0; i < siteList.length; i++) {
    box += `
            <tr class="border-bottom">
              <td class="p-2">${i + 1}</td>
              <td class="p-2">${siteList[i].sName}</td>
              <td class="p-2">
                <button class="btn btn-visit">
                  <i class="fa-solid fa-eye pe-2"></i><a class="text-white" href="${
                    siteList[i].sUrl
                  }" target="_blank">Visit</a>
                </button>
              </td>
              <td class="p-2">
                <button class="btn btn-delete pe-2" onclick="deleteSite(${i})">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>
`;
  }
  document.getElementById("tableBody").innerHTML = box;
}

function resetForm() {
  siteName.value = null;
  siteUrl.value = null;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(siteList));
  displaySite();
}

document.getElementById("close").onclick = function btnClose() {
  document.getElementById("overlay").classList.toggle("show-pop");
};
// document.getElementById("overlay").onclick = function overLayClose(e) {
//   e.target
//   document.getElementById("overlay").classList.toggle("show-pop");
// };
