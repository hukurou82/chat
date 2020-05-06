import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png'
import Hukurou from '../assets/img/hukurou.png'

const Chat = (props) => {
    const isQuestion = (props.type === 'question');//chatsから渡されてきたtypeがquestionかどうかの判断。questionならisQuestionにtrueが入り、questionでなければfalseが入る
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';//isQuestionの中がtrueなら'p-chat__row'のcssが読み込まれ、falseなら'p-chat__reverse'のcssが読み込まれる。読み込まれたcssはclasses内に入る

    return (
        <ListItem className={classes}>{/*上のconst classesに入ったcssを読み込む*/}
            <ListItemAvatar>
                {isQuestion ? (//jsxのif elseの書き方。isQuestionがtrueかfalseか判断
                    <Avatar alt="icon" src={Hukurou} />//trueの場合
                ):(
                    <Avatar alt="icon" src={NoProfile} />//falseの場合
                )
                }
            </ListItemAvatar>
            <div className="p-chat__bubble">{props.text}</div>{/*chats.jsxから渡されてきたtextを入れる */}
        </ListItem>
    )
}

export default Chat;