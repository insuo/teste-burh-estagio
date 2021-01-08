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

var url;

// const Movie = {
//   name: "",
// };

var list;

if (input) input.onchange = handleChange;

function handleChange(e) {
  $(".search").removeClass("searching");
  $(".search").addClass("searching");
  //substituir o titulo do filme por outro
  if (e.target.value) {
    let del = document.querySelectorAll(".img");

    Array.from(del).forEach((index) => {
      index.remove();
    });
  }

  if (!e.target.value) {
    let del = document.querySelectorAll(".img");
    console.log(del);
    $(".search").removeClass("searching");

    Array.from(del).forEach((index) => {
      index.remove();
    });
  }

  if (e.target.value != null && $(".search").hasClass("searching")) {
    url = "http://www.omdbapi.com/?apikey=c17838bb&s=" + e.target.value;

    $.getJSON(url, function (json) {
      // console.table(json);
      list = json.Search;
      console.table(list);

      if (list != undefined) {
        list.forEach(function (item, index) {
          if (item.Poster != "N/A") {
            let image = document.createElement("img");
            image.classList.add("img");
            image.src = item.Poster;
            // image.addEventListener("click", openPoster);
            image.id = index;
            image.onclick = openPoster;
            wrapper.appendChild(image);
          }
        });
      } else {
        $(".search").removeClass("searching");
        alert("Não encontramos um filme com este nome.");
        e.target.value = null;
      }
    });
  }
}

function openPoster() {
  modal.style.display = "block";
  let target = document.getElementById(this.id);
  modalPoster.src = target.src;
  // console.log(modalContent.firstChild);
  title.innerHTML = "Name: " + list[this.id].Title;
  type.innerHTML = "Type: " + list[this.id].Type;
  year.innerHTML = "Year: " + list[this.id].Year;
  // modal.firstChild.innerHTML = list[this.id].Title;
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target == modal)
  modal.style.display = "none";
};
