// elementos do input
const input = document.querySelector(".searchInput");

// elementos da lista de posters
const wrapper = document.querySelector(".wrapper");

// elementos do modal
const modal = document.querySelector(".modal");
const modalContent = modal.firstElementChild;
const modalPoster = document.querySelector(".modal-poster");
const span = document.querySelector(".close");

// classes do modalContent
const title = document.querySelector('.title');
const type = document.querySelector('.type');
const year = document.querySelector('.year');
const plot = document.querySelector('.plot');

const key = 'c17838bb';

var req;
var detailedMovie;
var list;

if (input) input.onchange = handleChange;

function handleChange(e) {
let target = e.target.value

  $(".search").removeClass("searching");
  $(".search").addClass("searching");
  //substituir o titulo do filme por outro
  if (target) {
    let del = document.querySelectorAll(".img");

    Array.from(del).forEach((index) => {
      index.remove();
    });
  }

  if (!target) {
    let del = document.querySelectorAll(".img");
    console.log(del);
    $(".search").removeClass("searching");

    Array.from(del).forEach((index) => {
      index.remove();
    });
  }

  if (e.target.value != null && $(".search").hasClass("searching")) {
    req = "http://www.omdbapi.com/?apikey=" + key + "&s=" + target + "&r=json";

    $.ajax({
      method: "GET",
      url: req,
      success: function(data){
        console.log(data)
        list = data.Search;

        if (list != undefined) {
          list.forEach(function (item, index) {
            if (item.Poster != "N/A" && item.Type == "movie") {
              let image = document.createElement("img");
              image.classList.add("img");
              image.src = item.Poster;
              image.id = index;
              image.onclick = openPoster;
              wrapper.appendChild(image);
            }
          });
        } else {
          $(".search").removeClass("searching");
          // alert("Não encontramos um filme com este nome.");
          target = null;
        }
      }
    })
  }
}

function openPoster() {
  modal.style.display = "block";
  let target = document.getElementById(this.id);
  modalPoster.src = target.src;
  title.innerHTML = "Name: " + list[this.id].Title;
  type.innerHTML = "Type: " + list[this.id].Type;
  year.innerHTML = "Year: " + list[this.id].Year;
}

window.onclick = function (e) {
  if (e.target == modal)
  modal.style.display = "none";
};
