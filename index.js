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
})
const magicProjectsGrid = new MagicGrid({
  container: "#work_section",
  animate: true,
  gutter: 30, // default gutter size
  static: true,
  useMin: false,
  maxColumns: 2,
  useTransform: true
});

const magicForksGrid = new MagicGrid({
  container: "#forks_section",
  animate: true,
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
});
var url = "https://api.github.com/users/krapas170/repos?sort=pushed";
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

  let name = [];
  let language = [];
  let description = [];
  let html_url = [];
  let forks = [];
  let stargazers_count = [];

  for (i = 0; i < 4; i++) {
    name[i] = arr[i].name;
    language[i] = arr[i].language;
    description[i] = arr[i].description;
    html_url[i] = arr[i].html_url;
    forks = arr[i].forks;
    stargazers_count = arr[i].stargazers_count;

    console.log(name[i]);
    console.log(language[i]);
    console.log(description[i]);
    console.log(html_url[i]);
    console.log(forks[i]);
    console.log(stargazers_count[i]);

    out +=
      '<a href="' + html_url[i] + '" target="_blank">' +
      '<section>' +
      '<div class="section_title">' + name[i] + '</div>' +
      '<div class="about_section">' +
      '<span style="display:block;">' + description[i] + '</span>' +
      '</div>' +
      '<div class="bottom_section">' +
      '<span style="display:inline-block;"><i class="fas fa-code"></i>&nbsp; ' + language[i] + '</span>' +
      '<span><i class="fas fa-star"></i>&nbsp; ' + forks[i] + '</span>' +
      '<span><i class="fas fa-code-branch"></i>&nbsp; ' + stargazers_count[i] + '</span>' +
      '</div>' +
      '</section>' +
      '</a>';

  }


  document.getElementById("work_section").innerHTML = out;
}