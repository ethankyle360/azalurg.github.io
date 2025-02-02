const links = [
    'https://raw.githubusercontent.com/Azalurg/homepage/main/script/index.js',
    'https://raw.githubusercontent.com/Azalurg/homepage/main/script/weather.js',
    'https://raw.githubusercontent.com/Azalurg/Crypta/master/src/tools/vigenereBeispiel.py',
    'https://raw.githubusercontent.com/Azalurg/yt-mp3/main/script.py',
    'https://raw.githubusercontent.com/Azalurg-Uni-Projects/003-java-freeMarket/main/Market/game/Game.java',
    'https://raw.githubusercontent.com/Azalurg/zoo-manager/master/src/main/java/com/github/azalurg/zoomanager/custom/RandomId.java',
    'https://raw.githubusercontent.com/Azalurg/rust_playground/master/guessing_game/src/main.rs',
    'https://raw.githubusercontent.com/Azalurg-Uni-Projects/labs-optymalizacja-kombinatoryczna/master/lab08/main.py'
];

let word_speed = 100;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function get_text(link) {
    return fetch(link).then(response => response.text());
};

function max(a, b) {
    if (a > b) return a;
    return b;
};

function delay(char) {
    if (char == ' ') {
        word_speed = Math.floor(Math.random() * 50) + 10;
        return 150;
    }
    word_speed += 1;
    return max(word_speed, 100);
};

function print(text, index, callback) {
    let char = text[index];
    if (text[index] == '\n') char = '<br>';

    setTimeout(() => {
        document.querySelector('#background').innerHTML += char;
        if (index < text.length - 1) {
            print(text, index + 1, callback);
        } else {
            document.querySelector('#background').innerHTML += '<br><br>';
            callback();
        }
    }, delay(char));
};

function fetch_and_print() {
    const link = shuffleArray(links).pop();
    if (!link) {
        console.log("finish");
        return;
    }

    fetch(link)
        .then(response => response.text())
        .then(text => {
            print(text, 0, fetch_and_print);
        })
        .catch(error => console.error(`Error fetching ${link}:`, error))
};

fetch(shuffleArray(links).pop())
    .then(response => response.text())
    .then(text => {
        let inner_HTML = '';
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            if (text[i] == '\n') char = '<br>';
            inner_HTML += char;
        }
        document.querySelector('#background').innerHTML += inner_HTML;
        document.querySelector('#background').innerHTML += '<br><br>';
        fetch_and_print();
    })
    .catch(error => console.error(`Error fetching ${link}:`, error));
