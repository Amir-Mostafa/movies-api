
var query =new URLSearchParams(window.location.search);
var currentId=query.get("id"); 
var single=[];
async function getMovies()
{
  let response = await fetch(`https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=24ce31110d03d653564b16e4458f2289&language=en-US`);
  
  let result =await response.json();


  all=result.results;
  getsingle();
   
  
}
async function getsingle()
{
    
    let response = await fetch(`https://api.themoviedb.org/3/movie/${currentId}?api_key=24ce31110d03d653564b16e4458f2289&language=en-US`);
  
    let result =await response.json();
    single=result;
    
    diplayAll();
}
getMovies();

function diplayAll()
{

  let str=
  `
  <div class="col-md-6 p-5 text-white">
            
  <h2 class="text-info text-center ">${single.title}</h2>
  <h5 class="text-muted">overview</h5>
  <p>${single.overview}</p>
  <h5 class="text-muted">vote</h5>
  <h3>${single.vote_average}</h3>
  <h5 class="text-muted">Release Date</h5>
  <span>${single.release_date}</span>
</div>
<div class="col-md-6">
<img class="img-fluid" src="https://image.tmdb.org/t/p/w500${single.poster_path}">
</div>

<div class="col-sm-12 ">
<div class="video w-100  " id="vv">
<iframe src="https://www.youtube.com/embed/${all[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> 
</div>

  `;

  document.getElementById("data").innerHTML=str;
}