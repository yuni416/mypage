export const show_popular = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDI3NmJkYThlZWUwZmVhN2I0OTdlZTQ4OGVjNzEzMCIsInN1YiI6IjY0NzBhNzQwMTNhMzIwMDExNmI2YTM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LJEjOT1v4yDJH6Twg5KPID8YCFIrHQrsJ6Py-U9XqpU",
    },
  };

  //영화 데이터가 담길 div태그를 상수에 할당
  const movie_list = document.querySelector("#movie-list");

  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko&page=1",
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let movies = data["results"];

      let temp_html = movies.map((result, i) => {
        let id = result["id"];
        let title = result["title"];
        let overview = result["overview"];
        let vote = result["vote_average"];
        let poster = result["poster_path"];
        let poster_path = "https://image.tmdb.org/t/p/w400" + poster;
        // img 태그에는 이미지 클릭 시 해당 영화의 id를 alert해주는 onClick이벤트 추가
        return `<div class="movie-content">
                       <img src="${poster_path}" onclick="show_details('${id}')" id="movie-poster">
                       <div class="movie-title">${title}</div>
                       <div class="movie-vote">평점 : ${vote}</div>
                       <div class="movie-overview">${overview}</div>
                       </div>`;
      });
      // join 메서드로 배열의 내용물을 문자열로 모아줌
      // 반복문이 종료된 이후 innerHTML에 모아진 내용물을 <div id='#movie-list'> 내부에 넣어줌
      movie_list.innerHTML = temp_html.join("");
    })
    .catch((err) => console.error(err));
};
    