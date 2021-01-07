var input = document.querySelector('.searchInput');

if (input) input.onchange = handleChange;

function handleChange(e){

let url = "http://www.omdbapi.com/?s="+e.target.value+"&apikey=c17838bb";

$.get(url, function(data){
  console.table(data);
});

console.log(url);
}