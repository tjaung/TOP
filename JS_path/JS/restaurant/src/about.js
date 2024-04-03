import { createElementWithClass, toggleIndicator } from "./helpers";
import about from './about.png'

export function renderAbout() {
    const aboutDiv = createElementWithClass('div', ['about'])
    
    const intro = document.createElement('h1');
    const paragraph1 = document.createElement('p')
    const paragraph2 = document.createElement('p')
    const paragraph3 = document.createElement('p')
    const paragraph4 = document.createElement('p')
    const paragraph5 = document.createElement('p')
    const paragraph6 = document.createElement('p')
    
    // aboutDiv.innerHTML = 'ABOUT THIS PAGE'
    
    const introText = 'About shef'
    const p1 = "Welcome to shef, where tradition meets excellence. With a legacy spanning over several decades, we take immense pride in offering our patrons an authentic Italian dining experience unlike any other."
    const p2 = "Our journey began with Nonna Maria's cherished recipes, passed down through generations, each dish a testament to our Italian heritage and commitment to quality. From handmade pasta to exquisite entrees, every bite is infused with love and authenticity."
    const p3 = "At the heart of our restaurant is family. We invite you to join us at our table, where laughter echoes through the dining room and memories are made over plates of steaming pasta and glasses of fine wine."
    const p4 = "From the moment you step through our doors, you'll be transported to the rustic villages of Italy, where simplicity meets sophistication and every meal is a celebration of life's simple pleasures."
    const p5 = "Come experience the warmth of our hospitality, the richness of our flavors, and the magic of true Italian cuisine. Whether you're a regular or a first-time visitor, we promise an unforgettable dining experience that will keep you coming back for more."
    const p6 = 'Buon Appetito!'  

    intro.innerHTML = introText
    paragraph1.innerHTML = p1
    paragraph2.innerHTML = p2
    paragraph3.innerHTML = p3
    paragraph4.innerHTML = p4
    paragraph5.innerHTML = p5
    paragraph6.innerHTML = p6
    
    const imgContainer = createElementWithClass('div', ['image-container'])
    const img = new Image()
    img.src = about
    imgContainer.appendChild(img)

    aboutDiv.appendChild(intro)
    aboutDiv.appendChild(paragraph1)
    aboutDiv.appendChild(paragraph2)
    aboutDiv.appendChild(paragraph3)
    aboutDiv.appendChild(imgContainer)
    aboutDiv.appendChild(paragraph5)
    aboutDiv.appendChild(paragraph6)

    // toggleIndicator(true)

    return [aboutDiv]
}