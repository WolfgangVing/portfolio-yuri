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

// Send email SMTPjs service from stmpjs.com

// const nome = document.getElementById("name").value
// const email = document.getElementById('email-cont').value
// const subject = document.getElementById("subject").value
// const msg = document.getElementById("message").value



// document.getElementById('formsend').onsubmit = event => {
//   event.preventDefault()
//   Email.send({
//     SecureToken : "ef2544bc-6543-4e97-8ece-653ba0dc5a97",
//     To: "ycss.v1@gmail.com",
//     from: email,
//     Subject: subject,
//     Body: `Name: ${nome}\nEmail: ${email}\nContent: ${msg}`
//   }).then (
//     message => alert(message)
//   ).catch(e => alert(e))
//   reset()
// }