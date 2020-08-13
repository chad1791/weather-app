const weatherForm = document.querySelector("#weatherForm");
const search = document.querySelector("#address");

const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

weatherForm
    .addEventListener('submit', (ev) => {

        msgOne.textContent = "Loading...";
        msgTwo.textContent = "";

        ev.preventDefault();
        ev.stopPropagation();

        let address = search.value;

        fetch("/weather?address="+address).then((response) => {
        
            response
                .json()
                .then((data) => {

                    if(data.error){

                        msgOne.textContent = data.error;
                        msgTwo.textContent = "";
                    }
                    else{
                        msgOne.textContent = data.location;
                        msgTwo.textContent = data.forecast;
                    }                
            });
        });

        return false;
});