import {React, useState} from "react";
import io from 'socket.io-client';
import MessageItem from "./MessageItem";

const socket = io('http://localhost:8080');

const Chat = ({item}) => {
    const [messages, setMessages] = useState();
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        thumbnail: ''
    })
    const handleInputChange = (event) => {
        console.log(formValues)
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(formValues.mail === '') {
            return alert('debe ingresar su mail para enviar un mensaje');
        }
        let post = formValues;
        post.date = new Date().toLocaleString();
        try {
            setFormValues({
                mail: '',
                message: '',
                date: ''
            })
        socket.emit('newMessage', post);
        } catch (e) {
          alert(e)
        }
    }
    socket.on('messages', messages => {
      setMessages(messages);
    })

    return <div className="chat-container">
        <h2>Centro de mensajes</h2>
        <form onSubmit={handleSubmit}>
            <input type="mail" placeholder="ingrese su mail" name="mail" onChange={handleInputChange} value={formValues.mail} />
            <div className="mensajes">
                {
                    messages ? messages.map(mess => <MessageItem item={mess} />) : null
                }
            </div>
            <input type="text" placeholder="ingrese su mensaje" name="message" onChange={handleInputChange} value={formValues.message} />
            <input type="submit" value='enviar' />
        </form>
    </div>
}

export default Chat;