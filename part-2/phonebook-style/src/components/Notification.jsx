

const Notification = ({ notification }) =>{

    //yade notification ko key (msg) ko value null nae xa vane return null
    if ( notification.message === null) return null;

    //using javascript obj as inline style inreact
    const notificationStyle = {
        color: notification.type === 'success' ? 'green' : 'red',
        background: 'lightgray',
        fontSize: 20,
        //never seen like this one 
        border: `3px solid  ${notification.type === 'success' ? 'green' : 'red'} `,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    };


    
    return ( 
        <div style={notificationStyle}> {notification.message} </div>
    );
}

export default Notification;