async function deleteBlog(event) {
  event.preventDefault();

  const deleteBlogId = event.target.dataset.deleteBlogId;
  console.log(deleteBlogId);

  if (deleteBlogId) {
    const response = await fetch(`/api/blog/${deleteBlogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // document.location.replace('/blog');
      document.location.reload();
    } else {
      console.log(response.statusText);
      alert('You did not write this entry!');
    }
  }
}

const deleteBlogBtns = document.querySelectorAll('.delete-blog');
deleteBlogBtns.forEach((btn) => {
  btn.addEventListener('click', deleteBlog);
});
