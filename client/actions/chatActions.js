export function sendMessage(text){
    console.log("123")
    return {
        type: 'SendMessage',
        text: text
    }
}