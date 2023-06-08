export const comment_button = (id) => {
  const comment_name = document.querySelector('#comment-name').value;
  const comment_pwd = document.querySelector('#comment-pwd').value;
  const comment_body = document.querySelector('#comment-body').value; 

  

  const comment_init = [];
  const temp_comment = {
    name: comment_name,
    pwd: comment_pwd,
    comment: comment_body
  }
  let movieid_comment = JSON.parse(window.localStorage.getItem(`${id}_comment`))

  if(!movieid_comment) {
    window.localStorage.setItem(`${id}_comment`, JSON.stringify(comment_init))
    movieid_comment = JSON.parse(window.localStorage.getItem(`${id}_comment`))
    let i = movieid_comment.length;
    movieid_comment[i] = temp_comment
    window.localStorage.setItem(`${id}_comment`, JSON.stringify(movieid_comment))
  } else {
    let i = movieid_comment.length;
    movieid_comment[i] = temp_comment
    console.log(movieid_comment)
    window.localStorage.setItem(`${id}_comment`, JSON.stringify(movieid_comment))
  }
  show_details(id);
  
}

export const show_comment = (id) => {
  let movieid_comment = JSON.parse(window.localStorage.getItem(`${id}_comment`))
  let temp_html = ``;
  movieid_comment.forEach((comment) => {
    temp_html = temp_html + `<div class="comment">${comment['comment']} - ${comment['name']}님</div>`
  });
  document.querySelector('#movie-review').innerHTML = temp_html
}