import { comment_button } from './comment.js'

// 영화 상세 페이지 정보 제공 함수
// 라우터 구성이 되어있지 않기때문에 페이지 내의 데이터를 갈아 끼우는 방식으로 구현
// 따라서 새로고침 시 첫 화면으로 이동, 뒤로가기 불가
export const show_details = (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDI3NmJkYThlZWUwZmVhN2I0OTdlZTQ4OGVjNzEzMCIsInN1YiI6IjY0NzBhNzQwMTNhMzIwMDExNmI2YTM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LJEjOT1v4yDJH6Twg5KPID8YCFIrHQrsJ6Py-U9XqpU",
    },
  };

  const movie_list = document.querySelector("#movie-list");

  fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko`, options)
    .then((res) => res.json())
    .then((data) => {
      let poster = data["poster_path"];
      let poster_path = "https://image.tmdb.org/t/p/w300" + poster;
      let title = data["title"];
      let release = data["release_date"];
      let tagline = data["tagline"];
      let runtime = data["runtime"];
      let vote = data["vote_average"];
      let overview = data["overview"];

      let temp_html = `<div id="movie-details">
                          <img src="${poster_path}" id="movie-poster">
                          <div>
                            <div class="movie-title">${title}</div>
                            <div id="tagline">${tagline}</div>
                            <div id="release">
                              <span>개봉 : ${release}</span> <span>상영시간 : ${runtime}분</span>
                            </div>
                            <div class="movie-vote">rate : ${vote}</div>
                            <div class="movie-overview">${overview}</div>
                          </div>
                        </div>
                        <div id="movie-review">`;

// <button onclick="localStorage.clear(); window.location.reload()">삭제
// <input id="comment-pwd" type="password" name="pwd" placeholder="비밀번호"></input>
      let movieid_comment = JSON.parse(window.localStorage.getItem(`${id}_comment`))
      if (movieid_comment) {
        

        movieid_comment.forEach((comment) => {



          temp_html = temp_html + `
          <div class="comment">${comment['comment']} - ${comment['name']}님
          <button id="delButton">삭제</button>
          </div>
          `
          ;

        });
      }
      

      temp_html = temp_html + `<div id="comment_list">
                    <input id="comment-name" type="text" name="name" placeholder="닉네임">
                    <input id="comment-pwd" type="password" name="pwd" placeholder="비밀번호">
                    <textarea id="comment-body" placeholder="한 줄 평을 입력해 주세요"></textarea>
                    <button onclick="comment_button('${id}')">작성
                    </div>`;
      movie_list.innerHTML = temp_html;
    })
    .catch((err) => console.error(err));

    // const delete = document.getElementById("delButton");

    // delete.addEventListener('click', () => {
    // document.body.style.backgroundColor = 'red';
    // });

};

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("delButton");
  console.log(deleteButton)
  deleteButton.addEventListener('click', () => {
    console.log("클릭")
  })
})