
'use strict';

{
    const titleClickHandler = function(event){
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
      
      // EVENT LISTENER REGISTRATION
      //This part of the code ensures that every link in the 
      //.titles list runs the handler when clicked:
      const links = document.querySelectorAll('.titles a');
      
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
      }
      
}