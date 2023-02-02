import React from "react";

const MessageItem = ({item}) => {
    return <div>
        <p>{`${item.mail} dice: ${item.message} // ${item.date}`}</p>
    </div>
}

export default MessageItem;