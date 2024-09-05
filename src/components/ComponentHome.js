function ComponentHome(title) {
    
    return(
        `
        <div class="dashboard">
          <div class="menu" id="menu"></div>

          <div class="containerElemets">
            <header class="headerDashboard">
              <button class="menuButton" id="toggleTheme"><i class="bi bi-toggles"></i></button>
              <button class="menuButton" id="menuButtonPerson"><i class="bi bi-person"></i></button>
            </header>
            <div class="contentElements" id="contentElements">
              <h1 class="pathContainer">
                ${title}
              </h1>
              
              <div class="cardElements" id="cardElements"></div>
              <div class="searchElement" id="searchElement"></div>

              <div class="recents" id="recents">
              
              </div>
              
            </div>
          </div>
       </div>
        
        `
    );
}
export default ComponentHome;