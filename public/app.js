const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransition() {
  //Button Click active class
  for(let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener('click', function(){
      let currentBtn = document.querySelectorAll('.active-btn')
      currentBtn[0].className = currentBtn[0].className.replace('active-btn', "")
      this.className += " active-btn";
    })
  }
  
  //Sections Active
  allSections.addEventListener('click', (e) =>{
    const id = e.target.dataset.id
    if(id){
      //remove selected from others btns
      sectBtn.forEach(btn => {
        btn.classList.remove('active');
      })
      e.target.classList.add('active');

      //Hide others sections
      sections.forEach((section) => {
        section.classList.remove('active')
      })

      const element = document.getElementById(id);
      element.classList.add('active');
    }
  })

  // Theme change
  //adding light-mode to body classList
  document.querySelector('.theme-btn').addEventListener('click', e => {
    document.body.classList.toggle('light-mode')
  })
}

pageTransition()


