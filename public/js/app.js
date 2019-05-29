const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Hello'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // sintaks ini biar pas klik submit, halaman ngga nge-refresh

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = search.value
    const url = '/weather?address='+address // url ini diganti, karena heroku gak kenal localhost 'http://localhost:3000/weather?address='+address

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})