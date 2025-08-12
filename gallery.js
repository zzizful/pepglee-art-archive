const selectedTags = new Set();

function toggleTag(button) {
  const tag = button.getAttribute('data-tag');
  if (selectedTags.has(tag)) {
    selectedTags.delete(tag);
    button.style.backgroundColor = '';
  } else {
    selectedTags.add(tag);
    button.style.backgroundColor = '#97d97b99'; 
  }
  filterImages();
}

function resetFilters() {
  selectedTags.clear();
  document.querySelectorAll('#tag-buttons button[data-tag]').forEach(btn => {
    btn.style.backgroundColor = '';
  });
  filterImages();
}

function filterImages() {
  const images = Array.from(document.querySelectorAll('.body img'));
  if (selectedTags.size === 0) {
    // Show all images
    images.forEach(img => img.style.display = 'block');
  } else {
    images.forEach(img => {
      const tags = img.getAttribute('data-tags')?.split(' ') || [];
      // Show image only if it has ALL selected tags
      img.style.display = [...selectedTags].every(tag => tags.includes(tag)) ? 'block' : 'none';
    });
  }
}

// Initialize on page load: show all images
window.onload = () => {
  filterImages();
};


function addTagLabels() {
  const wrappers = document.querySelectorAll('.img-wrapper');
  wrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    const tags = img.getAttribute('data-tags');
    if (!tags) return;

    const tagLabel = document.createElement('div');
    tagLabel.className = 'tag-label'; 
    tagLabel.textContent = tags.split(' ').map(t => `#${t}`).join(' ');


    wrapper.appendChild(tagLabel);
  });
}

window.onload = () => {
  filterImages();  
  addTagLabels();   
};
