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


function novoElement(tagName, className = undefined, options){
  const elem = document.createElement(tagName)
  className && (elem.className = className)
  
  if(options) {
    for (const [att, value] of Object.entries(options)) {
      elem.setAttribute(att, value)
    }
  }

  return elem
}

function createProject(imageURL = [], projectTitle = '', catchphrase, listOfIcons = ['github'], text = '') {

  const portfolioItem = novoElement('div', 'portfolio-item')
  const cardItem = novoElement('div', 'card-item')
  const imgCont = novoElement('div', 'image')
  const hoverItem = novoElement('div', 'hover-item')
  const iconsCont = novoElement('div', 'icons') 
  const cardDescription = novoElement('div', 'card-description')
  const title = novoElement('h3')
  title.innerHTML = `${projectTitle}<br>${catchphrase}`
  
  //creating img to the img container > add class and set attributes src='url', alt=text/string, class=string of the img
  imgCont.append(novoElement('img', 'techs', {
    src: imageURL[0],
    alt: imageURL[1],
    class: 'techs'
  }))

  //create and add icons to the container of Icons > set attributes
  listOfIcons.forEach(element => {
    const link = novoElement('a','icon', {
      href: element[1],
      target: "_blank",
    })
    element[0] === 'replit' ? link.appendChild(novoElement('img', 'replit-icon', {
      src: 'styles/icons/replit-icon.svg',
      alt: 'Replit'
    })) : link.appendChild(novoElement('i', 'fa-brands fa-github-alt'))

    iconsCont.append(link)
  })

  //create card description
  cardDescription.innerHTML = `<p>${text}</p>`
  hoverItem.append(title, iconsCont)
  cardItem.append(imgCont, hoverItem)

  portfolioItem.append(cardItem, cardDescription)

  return portfolioItem
}

function addProject(obj) {
  const portfolioCont = document.querySelector('.portfolios')
  console.log(obj)
  
  obj.projects.forEach(({imageURL, projectTitle, catchphrase, listOfIcons, text}) => {
    portfolioCont.append(createProject(imageURL, projectTitle, catchphrase, listOfIcons, text))
  })
}
//when I settle this to make a AJAX request to an API or retrieve this content from firebase database this should work with array of objects,
// for each one will be creating a card to append in the html, for now the data is inside: json/projects.json
async function populateProjects() {

  const requestURL = "json/projects.json" //Local URL

  const request = new Request(requestURL);

  try {
    const response = await fetch(request);
    const projects = await response.json()
    addProject(projects)
  } catch (error) {
    alert(error)
  }
}

const iconList = new Map([
  ["academic", "fa-solid fa-graduation-cap"],
  ["certificate", 'fa-solid fa-certificate']
])
const iconLink = new Map([
  ["googleDrive", "fa-brands fa-google-drive"],
  ["freeCodeCamp", "fa-brands fa-free-code-camp"]
])

function createCertificate(status, titleName, spotlight, subtitle, dueDate, issuedBy, certificateId, type, certLink) {
  const certficateCont = novoElement('div', 'timeline-item')
  const tlIconsCont = novoElement('div', 'tl-icons-cont')
  const tlCertType = novoElement('div', 'tl-icon cert-type')
  const tlDueTime = novoElement('p', 'tl-duration')
  const title = novoElement('h5')
  

  tlCertType.append(novoElement('i', iconList.get(type)))
  title.innerHTML =  spotlight ? `${titleName}<br>${spotlight}<span><br>- ${subtitle}</span>` 
  : `${titleName}<span><br>- ${subtitle}</span>`
  tlDueTime.innerHTML = dueDate;
  
  if(status !== "finished") {
    const text = novoElement('a')
    text.innerHTML = issuedBy
    tlIconsCont.append(tlCertType)
    certficateCont.append(tlIconsCont, tlDueTime, title, text)
    return certficateCont
  }
  
  
  const linkToCert = novoElement('a', 'go-to-certificate', {
    href: certLink[1],
    target: "_blank"
  })
  linkToCert.append(novoElement('i', iconLink.get(certLink[0])))
  tlIconsCont.append(tlCertType, linkToCert)
  
  const issue = novoElement('p')
  issue.innerHTML = `<span>Emitido:</span> ${issuedBy}`

  if(certificateId) {
    const id = novoElement(p)
    id.innerHTML = `<span>Certificado Id:</span> ${certificateId}`
    certficateCont.append(tlIconsCont, tlDueTime, title, issue, id)
    return certficateCont
  }
  certficateCont.append(tlIconsCont, tlDueTime, title, issue)
  return certficateCont
}

function addCertificates(obj) {
  const certificateCont = document.querySelector('.timeline')
  console.log(obj)
  
  obj.certificates.forEach(({status, titleName, spotlight, subtitle, 
    dueDate, issuedBy, certificateId, certificateType, certLink}) => {
    
      const cert = createCertificate(status, titleName, spotlight, subtitle, 
      dueDate, issuedBy, certificateId, certificateType, certLink)
      console.log(certificateType)
    
      certificateCont.append(cert)
  })
}

async function populateCertificates() {
  const requestURL = "json/certificates.json" //Local URL
  const request = new Request(requestURL)

  const response = await fetch(request);
  const certificates = await response.json();

  addCertificates(certificates)
}

populateProjects()
populateCertificates()
pageTransition()