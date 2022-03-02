const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//disable enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key:'2e58e07841044c2f9bdffa2b5b12417a',
        src:joke,
        hl:'en-us',
        r:0,
        c:'mp3',
        f:'44khz_16bit_stereo',
        ssml: false,
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke ="";
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else{
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error){
        //catch error
    }    
}

//event listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);