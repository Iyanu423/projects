document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchUI = document.getElementById('search-UI');
  const filtersWrapper = document.getElementById('filter-options');
  const filterCheckboxes = filtersWrapper.querySelectorAll('input[type="checkbox"]');

  let selectedFilter = null; // CURRENTLY SELECTED EMAIL FILTER CATEGORY
  let unreadFilterChecked = false; // CURRENT STATE OF THE UNREAD FILTER CHECKBOX


  // Loading animation for search results
  function displayLoader() {
    const loaderWrapper = document.createElement('aside');
    const searchloader = document.createElement('div');
    loaderWrapper.setAttribute('id', 'search-preloader');
    searchloader.setAttribute('class', 'spinner');

    loaderWrapper.append(searchloader);
    searchUI.append(loaderWrapper);
  }
  
  async function loadEmails() {

    displayLoader();
    const response = await fetch('emails.json');
    const data = await response.json();
    return data.emails;
  }

  /**
    * Clears all existing search results from the search UI,
    * except for the first child element which is the search UI description.
    */
  function clearSearchUI() {
    while (searchUI.children.length > 1) {
      searchUI.removeChild(searchUI.lastChild);
    }
  }


  /**
   * Display a user-friendly message and image indicating no search results were found.
   * This provides visual feedback to the user when their search/filter returns no matches.
   */
  function showEmptyMessage() {
    const emptySpan = document.createElement('span');
    emptySpan.classList.add('empty-text');
    emptySpan.innerHTML = '<img style="height: 300px" src="icons/1000043206-removebg-preview.png" class="empty-image">No search results found...';
    searchUI.appendChild(emptySpan);
  }

  // HIGHLIGHT CHARACTERS THAT MATCH THE VALUES IN THE SEARCH INPUT
  function highlightMatch(text, search) {
    if (!search) return text;
    // Escape special regex characters in the search string to avoid errors
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    // Add a yellow highlight to the matching text
    return text.replace(regex, '<span style="background-color: yellow;">$1</span>');
  }

  // FILTER AND DISPLAY EMAILS THAT MATCH THE SEARCH AND EMAIL FILTER CATEGORY
  async function filterEmails(searchValue, mainFilter, unreadFilter) {
    const emails = await loadEmails();
    clearSearchUI();

    // If no search or filters are applied, show the empty message to notify the user
    if (!searchValue && !mainFilter && !unreadFilter) {
      showEmptyMessage();
      displayNotif('No search results found', 2000);
      return;
    }

    // Filter emails based on search and filter criteria
    const filteredEmails = emails.filter(email => {
      // Check if an email's from, subject, or content fields matches the value in the search input (case-insensitive)
      const matchesSearch = !searchValue ||
        email.from.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
        email.content.toLowerCase().includes(searchValue.toLowerCase());

      // Check if an email matches the selected main filter category
      let matchesFilter = true;
      if (mainFilter) { matchesFilter = email.status.toLowerCase() === mainFilter.toLowerCase(); }
      if (unreadFilter) { matchesFilter = matchesFilter && email.isRead === false; }

      return matchesSearch && matchesFilter;
    });


    // If no emails match the filters, show empty message and notify user
    if (filteredEmails.length === 0) {
      showEmptyMessage();
      displayNotif('No search results found', 2000);
      return;
    }

    // For each filtered email, highlight matching search terms and display in the search UI
    filteredEmails.forEach(email => {
      const highlightedContent = highlightMatch(email.content, searchValue);
      const highlightedFrom = highlightMatch(email.from, searchValue);

      // DISPLAY EMAIL THAT MATCHES THE SEARCH
      createNewMail(highlightedContent, email.timestamp, searchUI, highlightedFrom, email.status, email.subject, email.isRead);
    });
  }

  // INITIALIZE THE EMAIL SEARCH LOGIC WHEN THE SEARCH BAR RECEIVES INPUT
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    filterEmails(value, selectedFilter, unreadFilterChecked);
  });


  /**
   * Event listeners for all filter checkboxes.
   * Handles toggling of the unread filter independently and exclusive selection of main filters.
   * Updates UI checkmarks and triggers email filtering on change.
   */
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const isUnreadFilter = e.target.parentElement.id === 'unread-filter';

      if (isUnreadFilter) {
        // Toggle unread filter state
        unreadFilterChecked = e.target.checked;

        // Update checkmark for the unread filter
        const parent = e.target.parentElement;
        if (parent) {
          if (unreadFilterChecked) {
            parent.querySelector('.checkmark-emoji')?.remove();
            const checkmarkSpan = document.createElement('span');
            checkmarkSpan.classList.add('checkmark-emoji');
            checkmarkSpan.textContent = ' ✔';
            parent.appendChild(checkmarkSpan);
          } else {
            parent.querySelector('.checkmark-emoji')?.remove();
          }
        }
      } else {

        // Handle main email category filters (only one can be selected at a time)
        if (e.target.checked) {
          filterCheckboxes.forEach(cb => {
            if (cb !== e.target && cb.parentElement.id !== 'unread-filter') {
              cb.checked = false;

              // Uncheck all other main filters and remove their checkmarks except the unread filter
              const otherParent = cb.parentElement;
              if (otherParent) {
                otherParent.querySelector('.checkmark-emoji')?.remove();
              }
            }
          });

          // Set selected filter to the text content of the checked filter (lowercased)
          selectedFilter = e.target.parentElement.textContent.trim().toLowerCase();

          // Add checkmark to the selected email filter
          const parent = e.target.parentElement;
          if (parent) {
            parent.querySelector('.checkmark-emoji')?.remove();
            const checkmarkSpan = document.createElement('span');
            checkmarkSpan.classList.add('checkmark-emoji');
            checkmarkSpan.textContent = ' ✔';
            parent.appendChild(checkmarkSpan);
          }
        } else {
          selectedFilter = null;

          // If unchecked, clear selected filter and remove the checkmark
          const parent = e.target.parentElement;
          if (parent) {
            parent.querySelector('.checkmark-emoji')?.remove();
          }
        }
      }

      // Trigger the email filtering logic after the search input recieves focus
      filterEmails(searchInput.value.trim(), selectedFilter, unreadFilterChecked);
    });
  });
});
