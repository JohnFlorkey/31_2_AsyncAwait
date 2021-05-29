// Part 1 Number Facts

const BASE_URL = 'http://numbersapi.com/';
const number = 42;
const numbers = [45,46,14,16,18];
let url = '';
const numFacts = 4;
$content1 = $('#content-1');
$content2 = $('#content-2');
$content3 = $('#content-3');

// 1
const singleResponse = async function() {
    url = `${BASE_URL}${number}?json`;
    data = await axios.get(url);
    $content1.empty();
    $content1.text(data.data.text);
}
singleResponse();

// 2
async function multipleNumberFacts() {
    url = `${BASE_URL}${numbers.join()}?json`;
    data = await axios.get(url);
    $content2.empty();
    for (const fact in data.data) {
        console.log(data.data[fact]);
        $content2.append($('<p>').text(data.data[fact]));
    }
}
multipleNumberFacts();

// 3
async function oneNumberMultipleFacts() {
    url = `${BASE_URL}${number}?json`;
    const oneNumberMultipleFactsResponse = [];
    for (let i = 0; i < numFacts; i++) {
        oneNumberMultipleFactsResponse.push(axios.get(url));
    }
    data = await Promise.all(oneNumberMultipleFactsResponse)
    $content3.empty();
    for (const fact in data) {
        console.log(data[fact]);
        $content3.append($('<p>').text(data[fact].data['text']));
    }
}
oneNumberMultipleFacts();