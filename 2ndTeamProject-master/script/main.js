import { show_details } from "./movieDetail.js";
import { show_popular } from "./movieList.js";
import { search_movie } from "./movieSearch.js";
import { comment_button } from "./comment.js";
    
  
// 페이지 로드 완료 시 show_popular 함수를 통해 인기 영화 리스트를 불러와서 화면에 띄워주는 코드



window.show_details = show_details;
window.search_movie = search_movie;
window.comment_button = comment_button;
// keyup 이벤트 발생시 사용 할 이벤트핸들러
// Eneter의 keyCode는 13
const on_key_up = (event) => {
  if (event.keyCode === 13) search_movie();
};

// keyword라는 id를 갖고있는 input태그에 keyup 이벤트 발생 시 사용할 이벤트핸들러 on_key_up 할당
document.querySelector("#keyword").addEventListener("keyup", on_key_up);

document.addEventListener("DOMContentLoaded", () => {
  show_popular();
});