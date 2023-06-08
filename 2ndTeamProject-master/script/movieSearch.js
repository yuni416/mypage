
// 영화 검색기능 함수
export const search_movie = () => {
    // 검색할 영화 제목을 query string으로 서버로 전송해야 하기 때문에,
    // query에 영화 제목을 담기 위해 상수로 선언 후 input태그 속의 값을 할당해줌
    // 할당한 경로?가 바뀔 일은 없기 떄문에 변수 대신 상수로 선언
    const search_keyword = document.querySelector("#keyword").value;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDI3NmJkYThlZWUwZmVhN2I0OTdlZTQ4OGVjNzEzMCIsInN1YiI6IjY0NzBhNzQwMTNhMzIwMDExNmI2YTM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LJEjOT1v4yDJH6Twg5KPID8YCFIrHQrsJ6Py-U9XqpU",
      },
    };
    // 인기영화목록 불러오기와 같음
    const movie_list = document.querySelector("#movie-list");

    //검색할 영화 제목을 query string으로 url에 담아서 서버로 전송
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search_keyword}&include_adult=true&language=ko&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        let results = data["results"];

        //인기영화목록 불러오기와 같음
        let temp_html = "";

        results.forEach((result, i) => {
          let id = result["id"];
          let title = result["title"];
          let overview = result["overview"];
          let vote = result["vote_average"];
          let poster = result["poster_path"];
          let poster_path = "https://image.tmdb.org/t/p/w400" + poster;
          temp_html =
            temp_html +
            `<div class="movie-content">
                           <img src="${poster_path}" onclick="show_details('${id}')" id="movie-poster">
                           <div class="movie-title">${title}</div>
                           <div class="movie-vote">rate : ${vote}</div>
                           <div class="movie-overview">${overview}</div>
                           </div>`;
        });
        movie_list.innerHTML = temp_html;
        
      })
      .catch((err) => console.error(err));
    };
  