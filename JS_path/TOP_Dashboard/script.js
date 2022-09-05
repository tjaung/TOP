const openButt = document.querySelector('.openbtn');
const closeButt = document.querySelector('.closebtn');
const container = document.querySelector('.container');
const sidebar = document.querySelector('.sidebar');
const newButt = document.querySelector('.newButt');
const cardArea = document.querySelector('.card-space');

let openNav = () => {
    container.style.transition = "all 0.75s";
    container.style.gridTemplateColumns = "1fr 3fr 1fr";
    console.log('open nav');
    sidebar.style.display='';
    };

let closeNav = () => {
    container.style.transition = "all 0.75s";
    container.style.gridTemplateColumns = "0px 4fr 1fr";
    console.log('close nav');
    sidebar.style.display = 'none';
};

//let getInput = (f) => {
//    var formData = new FormData(f);
//    var newTitleText = formData.get('card-title');
//    var newDetailText = formData.get('new-detail');
//    const output = [newTitleText, newDetailText];
//    return output;
//}

// New card form
let inputCardInfo = () => {
    const closeBG = document.createElement('div');
    const newCard = document.createElement('div');
    const newForm = document.createElement('form');
    const newTitle = document.createElement('input');
    const newDetail = document.createElement('textarea');
    const newButtDiv = document.createElement('div');
    const newSubmit = document.createElement('button');

    closeBG.className = 'closeBG';
    newCard.className = 'new-card';
    newForm.className = 'new-form';
    newTitle.className = 'title';
    newDetail.id = 'new-detail';
    newButtDiv.className = 'butt-holder';
    newSubmit.id = 'submit-new';

    //newForm.action = '';
    //newForm.method = 'post';
    newForm.id = 'newCardInfo';
    
    newTitle.placeholder = 'Enter Title';
    newTitle.name = 'card-title';
    newTitle.minLength = 1;
    newTitle.maxLength = 50;
    newTitle.required = true;

    newDetail.placeholder = 'Enter details here';
    newDetail.name = 'new-detail';
    newDetail.maxLength = 250;

    newSubmit.innerHTML = 'Submit';
    //newSubmit.type = 'submit';
    newSubmit.addEventListener("click", () => {
        //const info = getInput(newForm)

        const cardDiv = document.createElement('div');
        const cardTitle = document.createElement('p');
        const cardText = document.createElement('p');
        console.log(newTitle.value)
        console.log(newDetail.value)

        makeCard(newTitle.value, newDetail.value);
        closeBG.remove();
        });
        
        newButtDiv.append(newSubmit);
        newForm.append(newTitle, newDetail);
        newCard.append(newForm, newButtDiv);
        closeBG.append(newCard);

        document.body.append(closeBG);

}

// New card function
let makeCard = (title, details) => {
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardText = document.createElement('p');
    console.log(title)
    console.log(details)

    //append children to parent div
    cardTitle.className = 'title';
    cardDiv.append(cardTitle, cardText);
    
    // add details
    cardTitle.innerHTML = title;
    cardText.innerHTML = details;

    // add card to card space
    cardArea.appendChild(cardDiv).className = 'card';

}
        
openButt.onclick = openNav;
closeButt.onclick = closeNav;

newButt.onclick = inputCardInfo;