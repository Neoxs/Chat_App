const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count)
// })

const msgBox = document.querySelector('.messages-box')
const msgForm = document.querySelector('#message-form')
const msgInput = msgForm.querySelector('input')
const msgBtn = msgForm.querySelector('button')
const locationBtn = document.querySelector('#send-location')

socket.on('consoleMsg', (msg) => {
    console.log(msg)
})

socket.on('newMessage', (msg) => {
    msgBox.insertAdjacentHTML('beforeend', `<div class="messages">${msg}</div><br>`)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    msgBtn.setAttribute('disabled', 'disabled')
    const message = msgInput.value
    msgInput.value = ""
    
    socket.emit('sendMessage', message, () => {
        msgBtn.removeAttribute('disabled')
        console.log("message was sent !")
    })


})

document.querySelector('#send-location').addEventListener('click', (e) => {
    e.preventDefault()

    locationBtn.setAttribute('disabled', 'disabled')

    if(!navigator.geolocation){
        return alert("our browser doesn't support geolocation" )
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => { 
            console.log('Location shared !')
            locationBtn.removeAttribute('disabled')
        })
    })

})