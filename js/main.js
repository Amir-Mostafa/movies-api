var movies=document.getElementById("movies");
var prev=document.getElementById("prev");
let search=document.getElementById("search");
let word=document.getElementById("word");
var all=[];
var min=0;
var max=0;
var num=5;
var query =new URLSearchParams(window.location.search);
var page=query.get("page"); 


if(page==null||page==0)
{
  max=min+num;
}
else
{
  min=num*page;
  max=num+min;
}
word.addEventListener("keyup", () => {
  SearchByWord(word.value);
  console.log(word.value);
});

async function SearchByWord(term) {
  if (term == "") return null;

  let newResult = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=e7ec94517a59bcd40a493b182802b7ff&language=en-US&query=${term}&page=1&include_adult=false`
  );
  let result = await newResult.json();

  all = result.results;
  diplayAll();
}

search.addEventListener("keyup",function(){
  searchInput(search.value);
});

async function getAllMovies()
{
  let response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=24ce31110d03d653564b16e4458f2289&language=en-US&page=1");
  
  let result =await response.json();
  all=result.results;
  console.log(all);
  diplayAll();
}
getAllMovies();

function diplayAll()
{
  let str=``;
  if(page<0||max>all.length)
  {
    window.history.back(); 
  }
  for(var i=min;i<max;i++)
  {
    str +=`
    <div class="col-md-4">
    <a href="details.html?id=${all[i].id}" target="_black" >
    <div class="item">
      <div class="img position-relative ">
      <img src="https://image.tmdb.org/t/p/w500${all[i].poster_path}" alt="" class="img-fluid" >
      <div class="overlay text-center pt-3 text-white position-absolute ">
        <h2>${all[i].title}</h2>
        <p>${all[i].overview}</p>
        <h3>${all[i].vote_average}</h3>
        <span>${all[i].release_date}</span>
      </div>
    </div>
      
    </div>
    </a>
  </div>
    `;
  }
  document.getElementById("movies").innerHTML=str;

  let num=all.length;
  let count=Math.ceil(num/5);
   str=`<li class="page-item" id="prev"><a class="page-link" href="?page=${page-1}">Previous</a></li>`;

  for(var i=0;i<count; i++)
  {
    str+=`<li class="page-item"><a class="page-link" href="?page=${i}">${i+1}</a></li>`
  }
  var x=page-1+2;
  str+=`<li class="page-item" id="next" ><a class="page-link" href="?page=${x}">Next</a></li>`
  document.getElementById("pages").innerHTML=str;
}

function searchInput(search)
{
  let str=``;
  var test=false;
  for(var i=0;i<all.length;i++)
  {
    
    if(all[i].title.toLowerCase().includes(search.toLowerCase())==true )
    {
      test=true;
    str +=`
    
    <div class="col-md-4">
    <a href="details.html?id=${all[i].id}" target="_black">
    <div class="item">
      <div class="img position-relative ">
      <img src="https://image.tmdb.org/t/p/w500${all[i].poster_path}" alt="" class="img-fluid" >
      <div class="overlay text-center pt-3 text-white position-absolute ">
        <h2>${all[i].title}</h2>
        <p>${all[i].overview}</p>
        <h3>${all[i].vote_average}</h3>
        <span>${all[i].release_date}</span>
      </div>
    </div>
      
    </div>
  </div>
  </a>
    `;
    }
    

  }
  if(!test)
    {
      str+="<h2 class='text-white' >No Results....</h2>"
    }
  document.getElementById("movies").innerHTML=str;
}
