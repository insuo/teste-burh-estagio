var input = document.querySelector(".searchInput");
var wrapper = document.querySelector(".wrapper");

if (input) input.onchange = handleChange;

function handleChange(e) {
  $(".search").removeClass("searching");
  $(".search").addClass("searching");
  //substituir o titulo do filme por outro
  if(e.target.value){
    let del = document.querySelectorAll(".img");
  
    Array.from(del).forEach(index => {
      index.remove();
    });
  }

  if(!e.target.value){
    let del = document.querySelectorAll(".img");
    console.log(del)
    $(".search").removeClass("searching");
  
    Array.from(del).forEach(index => {
      index.remove();
    });
  }

  if (e.target.value != null && $(".search").hasClass("searching")) {
    let url =
    "http://www.omdbapi.com/?s=" + e.target.value + "&apikey=c17838bb";

    $.getJSON(url, function (json) {
      // console.table(json);
      let list = json.Search;

      if(list != undefined){
        list.forEach(function (item) {
          if (item.Poster != "N/A") {
            let image = document.createElement("img");
            image.classList.add("img");
            image.src = item.Poster;
            wrapper.appendChild(image);
          }
        });
      }
      else{
        $(".search").removeClass("searching");
      }
    });
  }
}
