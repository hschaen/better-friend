import React from 'react';
function FriendList(props) {
    return (
        <ul className="list-group">
            {/* {props.friends.length ? props.friends.map(friend => { */}
                <li className="list-group-item">{props.name}</li>
            {/* }}) :
            <h3>No Friends Found</h3>
            }*/}
        </ul>
    );
}
export default FriendList;