setTimeout(function () {
  document.getElementById("loading").classList.add("animated");
  document.getElementById("loading").classList.add("fadeOut");
  setTimeout(function () {
    document.getElementById("loading").classList.remove("animated");
    document.getElementById("loading").classList.remove("fadeOut");
    document.getElementById("loading").style.display = "none";
  }, 800);
}, 1500);
$.getJSON("blog.json", function (blog) {
  blog = blog || [];
  if (blog.length == 0) {
    return (document.getElementById("blog_section").style.display =
      "none");
  }
  for (const element of blog) {
    console.log(element.visible);
    if (element.visible == true) {
      $("#blogs").append(`
        <a href="./blog/${element.url_title}/"" style="display: inline">
            <section>
                <img src="./blog/${element.url_title}/${element.top_image}">
                <div class="blog_container">
                    <div class="section_title">${element.title}</div>
                    <div class="about_section">
                        ${element.sub_title}
                    </div>
                </div>
            </section>
        </a>
        `);
    }
  }
}).fail(function () {
  return (document.getElementById("blog_section").style.display = "none");
});
const magicProjectsGrid = new MagicGrid({
  container: "#work_section",
  animate: false,
  gutter: 30, // default gutter size
  static: true,
  useMin: false,
  maxColumns: 2,
  useTransform: true
});

const magicForksGrid = new MagicGrid({
  container: "#forks_section",
  animate: false,
  gutter: 30, // default gutter size
  static: true,
  useMin: false,
  maxColumns: 2,
  useTransform: true
});

$("document").ready(() => {
  magicProjectsGrid.listen();
  magicForksGrid.listen();
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
var url = "https://api.github.com/users/krapas170/repos";
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url);
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    console.log(myArr);
    showWork(myArr);
  }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function showWork(arr) {
  var out = "";

  let pushed = [];
  let name = [];
  let language = [];
  let description = [];
  let html_url = [];
  let forks = [];
  let stargazers_count = [];

  for (i = 0; i < Object.keys(arr).length; i++) {
    pushed[i] = arr[i].pushed_at;
    name[i] = arr[i].name;
    language[i] = arr[i].language;
    description[i] = arr[i].description;
    html_url[i] = arr[i].html_url;
    forks = arr[i].forks;
    stargazers_count = arr[i].stargazers_count;

    console.log(pushed[i]);
    console.log(name[i]);
    console.log(language[i]);
    console.log(description[i]);
    console.log(html_url[i]);
    console.log(forks[i]);
    console.log(stargazers_count[i]);

    for (let index = 0; index < number_of_files[i]; index++) {
      console.log(arr[i].assets[index]);
    }
    console.log("Release-Nummer: " + name.length);
  }

  for (i = 0; i < Object.keys(arr).length; i++) {
    number_of_files[i] = arr[i].assets.length;
    html_url[i] = arr[i].html_url;
    name[i] = arr[i].name;
    body[i] = arr[i].body;a
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

    } else {
      let tag_name2 = [];
      tag_name2 = arr[i].tag_name;

      console.log(tag_name2);

      beschreibung = body[i].replace("**Full Changelog**: https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "", "<br><br><b>Full Changelog</b>: <a href='https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "' class='commit-link'>https://github.com/krapas170/Java-Memory/commits/" + tag_name2 + "</a>");

    }

    out +=
    '<a href="https://github.com/krapas170/krapas170.github.io" target="_blank">' +
    '<section>' +
      '<div class="section_title">krapas170.github.io</div>' +
      '<div class="about_section">' +
        '<span style="display:block;">My personal blog</span>' +
      '</div>' +
      '<div class="bottom_section">' +
        '<span style="display:inline-block;"><i class="fas fa-code"></i>&nbsp; HTML</span>'
        '<span><i class="fas fa-star"></i>&nbsp; 0</span>'
        '<span><i class="fas fa-code-branch"></i>&nbsp; 0</span>'
      '</div>'
    '</section>'
  '</a>';
  document.getElementById("work_section").innerHTML = out;
}