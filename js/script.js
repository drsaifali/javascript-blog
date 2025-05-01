
'use strict';

{
  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault();
    console.log('Link was clicked!');
    console.log('Event:', event);
    console.log('clickedElement', clickedElement);

    /* remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log('active links', activeLinks);
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      console.log('active link', activeLink);
    }

    /* add class 'active' to the clicked link */
    // const clickedElement = event.currentTarget;
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');
    for (let article of activeArticles) {
      article.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const generateTitleLinks = function (customSelector = '') {
    const titleList = document.querySelector('.titles');
    titleList.innerHTML = '';

    const articles = document.querySelectorAll('.post' + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector('.post-title').innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html += linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };


  // TAGS GENERATE
  const generateTags = function () {
    const articles = document.querySelectorAll('.post');
    console.log('articles from articles', articles);
    let allTags = {};

    for (let article of articles) {
      const tagWrapper = article.querySelector('.post-tags .list');
      console.log('tag wrapper', tagWrapper);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      console.log('article Tag', articleTags);
      const tagsArray = articleTags.split(' ');

      for (let tag of tagsArray) {
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        html += tagHTML;

        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }

      tagWrapper.innerHTML = html;
    }

    const tagList = document.querySelector('.tags');
    let allTagsHTML = '';

    for (let tag in allTags) {
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
    }

    tagList.innerHTML = allTagsHTML;

    const tagLinks = document.querySelectorAll('.tags a, .post-tags a');
    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  };

  const tagClickHandler = function (event) {
    const clickedElement = this;
    console.log('clickedElement from Tags', clickedElement);
    event.preventDefault();
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let link of activeTagLinks) {
      link.classList.remove('active');
    }

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let link of tagLinks) {
      link.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const generateAuthors = function () {
    const optArticleAuthorSelector = '.post-author';
    const articles = document.querySelectorAll('.post');
    let allAuthors = {};

    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      const author = article.getAttribute('data-author');

      const authorHTML = '<a href="#author-' + author + '">' + author + '</a>';
      authorWrapper.innerHTML = authorHTML;

      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    }

    const authorList = document.querySelector('.authors'); // optional
    if (authorList) {
      let allAuthorsHTML = '';
      for (let author in allAuthors) {
        allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      }
      authorList.innerHTML = allAuthorsHTML;
    }
  };

  const authorClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let link of activeAuthorLinks) {
      link.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let link of authorLinks) {
      link.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    const authorLinks = document.querySelectorAll('.post-author a, .authors a');
    for (let link of authorLinks) {
      link.addEventListener('click', authorClickHandler);
    }
  };

  generateTitleLinks();
  generateTags();
  generateAuthors();
  addClickListenersToAuthors();

}
