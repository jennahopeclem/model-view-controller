async function createComment(event) {
  event.preventDefault();

  const form = event.target;
  const comment = form['comment-text'].value;
  const blog_id = form.dataset.blogId;

  if (comment && blog_id) {
    const response = await fetch('/api/comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, blog_id }),
    });
    if (response.ok) {
      document.location.reload();
    } else {
      console.log(response.statusText);
      alert('You did not write this entry!');
    }
  }
}

const createCommentForms = document.querySelectorAll('.new-comment-form');
createCommentForms.forEach((form) => {
  form.addEventListener('submit', createComment);
});
