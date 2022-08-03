setTimeout(function () {
  document.getElementById("loading").classList.add("animated");
  document.getElementById("loading").classList.add("fadeOut");
  setTimeout(function () {
    document.getElementById("loading").classList.remove("animated");
    document.getElementById("loading").classList.remove("fadeOut");
    document.getElementById("loading").style.display = "none";
  }, 800);
}, 700);
$.getJSON("../../config.json", function (user) {
  var icon = document.createElement("link");
  icon.setAttribute("rel", "icon");
  icon.setAttribute("href", user[0].userimg);
  icon.setAttribute("type", "image/png");
  document.getElementsByTagName("head")[0].appendChild(icon);
  document.getElementById(
    "profile_img_blog"
  ).style.background = `url('${user[0].userimg}') center center`;
  document.getElementById(
    "username_blog"
  ).innerHTML = `<span style="display:${user[0].name == null || !user[0].name ? "none" : "block"
  };">${user[0].name}</span>@${user[0].username}<b id="blog_time"></b>`;

  if ((user[0].theme = "dark.css")) {
    document.querySelector("#background_overlay").style.background =
      "linear-gradient(0deg, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.1))";
  } else {
    document.querySelector("#background_overlay").style.background =
      "linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1))";
  }
});
window.transitionToPage = function (href) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function () {
    window.location.href = href
  }, 500)
}
document.addEventListener('DOMContentLoaded', function (event) {
  document.querySelector('body').style.opacity = 1
})
var url = "https://api.github.com/repos/krapas170/Java-Memory/releases";
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url);
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    showReleases(myArr);
    console.log(myArr);
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function showReleases(arr) {
  var out = "";

  let html_url = [];
  let name = [];
  let assets = [];
  let body = [];
  let number_of_files = [];

  for (i = 0; i < Object.keys(arr).length; i++) {
    number_of_files[i] = arr[i].assets.length;
    html_url[i] = arr[i].html_url;
    name[i] = arr[i].name;
    body[i] = arr[i].body;
    for (let index = 0; index < number_of_files[i]; index++) {
      files = {};
      files.file = [arr[i].assets[index].name, arr[i].assets[index].size, arr[i].assets[index].browser_download_url];
      id = assets.length;
      assets.push(files);
    }
    console.log(number_of_files[i]);
    console.log(html_url[i]);
    console.log(name[i]);
    console.log(body[i]);
    for (let index = 0; index < number_of_files[i]; index++) {
      console.log(arr[i].assets[index]);
    }
    //console.log(assets[i]);
    console.log("Release-Nummer: " + name.length);
  }

  for (i = 0; i < Object.keys(arr).length; i++) {
    number_of_files[i] = arr[i].assets.length;
    html_url[i] = arr[i].html_url;
    name[i] = arr[i].name;
    body[i] = arr[i].body;
    for (let index = 0; index < number_of_files[i]; index++) {
      files = {};
      files.file = [arr[i].assets[index].name, arr[i].assets[index].size, arr[i].assets[index].browser_download_url];
      id = assets.length;
      assets.push(files);
    }
    console.log(number_of_files[i]);
    console.log(html_url[i]);
    console.log(name[i]);
    console.log(body[i]);

    console.log(arr[i + 1]);

    let beschreibung;
    if (arr[i + 1] != undefined) {
      let tag_name1 = [];
      tag_name1 = arr[i + 1].tag_name;
      let tag_name2 = [];
      tag_name2 = arr[i].tag_name;

      console.log(tag_name1);
      console.log(tag_name2);

      beschreibung = body[i].replace("**Full Changelog**: https://github.com/krapas170/Java-Memory/compare/" + tag_name1 + "..." + tag_name2 + "", "<br><br><b>Full Changelog</b>: <a href='https://github.com/krapas170/Java-Memory/compare/" + tag_name1 + "..." + tag_name2 + "'><tt>" + tag_name1 + "..." + tag_name2 + "</tt></a>");
      beschreibung = body[i].replace("## What's Changed", "<br><h2>What's Changed</h2></br>")
    } else {
      let tag_name2 = [];
      tag_name2 = arr[i].tag_name;

      console.log(tag_name2);

      beschreibung = body[i].replace("**Full Changelog**: https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "", "<br><br><b>Full Changelog</b>: <a href='https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "' class='commit-link'>https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "</a>");

    }

    out +=
      "<div class='col-md-9' data-test-selector='release-card' data-view-component='true' class='Box'>" +
      "<div data-view-component='true' class='Box-body'>" +
      "<div class='d-flex flex-row mb-3'>" +
      "<div class='flex-1' data-pjax='#repo-content-pjax-container'>" +
      "<h1 data-view-component='true' class='d-inline mr-3'><a href='" + html_url[i] + "' data-view-component='true' class='Link--primary'>" + name[i] + "</a></h1>" +
      "<div class='v-align-text-bottom ml-2 d-none d-md-inline'></div>" +
      "</div>" +
      "<div class='ml-2 mt-3 d-md-none'> </div>" +
      "</div>" +
      "<div data-pjax='true' data-test-selector='body-content' data-view-component='true' class='markdown-body my-3'>" + beschreibung + "</div>" +
      "</div>" +
      "<div data-view-component='true' class='Box-footer'>" +
      "<div class='mb-3'>" +
      "<details open='open' data-view-component='true'>" +
      "<summary role='button' data-view-component='true'>" +
      "<h3 class='d-inline'>Assets</h3><span title='" + number_of_files[i] + "' data-view-component='true' class='Counter ml-1'>" + number_of_files[i] + "</span>" +
      "</summary>" +
      "<div data-view-component='true'>" +
      "<div data-view-component='true' class='Box Box--condensed mt-3'>" +
      "<ul>";

    for (let index = 0; index < number_of_files[i]; index++) {
      console.log(arr[i].assets[index]);
      out +=
        "<li data-view-component='true' class='Box-row'> <svg aria-hidden='true' height='16' viewBox='0 0 16 16' version='1.1' width='16' data-view-component='true' class='octicon octicon-package color-fg-muted'>" +
        "<path fill-rule='evenodd' d='M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z'>" +
        "</path>" +
        "</svg> <a href='" + arr[i].assets[index].browser_download_url + "' rel='nofollow' data-skip-pjax> <span" +
        "class='px-1 text-bold'>" + arr[i].assets[index].name + "</span></a><span class='float-right color-fg-muted' data-test-selector='asset-size-label'>" + (arr[i].assets[index].size / 1048576).toFixed(2) + " MB</span>" +
        "</li>"
    }
    out +=
      "</ul>" +
      "</div>" +
      "</div>" +
      "</details>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div><br><br>";
  }
  console.log(out);
  document.getElementById("versions").innerHTML = out;
}