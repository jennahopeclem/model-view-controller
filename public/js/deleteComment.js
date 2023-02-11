async function deleteComment(event) {
  event.preventDefault();

  const deleteCommentId = event.target.dataset.commentId;
  console.log(deleteCommentId);

  if (deleteCommentId) {
    const response = await fetch(`/api/comment/${deleteCommentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // document.location.replace('/comment');
      document.location.reload();
    } else {
      console.log(response.statusText);
      alert('You did not write this comment!');
    }
  }
}

const deleteCommentBtns = document.querySelectorAll('.delete-comment');
deleteCommentBtns.forEach((btn) => {
  btn.addEventListener('click', deleteComment);
});
