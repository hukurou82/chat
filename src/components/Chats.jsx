import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Chat } from './index';

//マテリアルUI
const useStyles = makeStyles(() => (
    createStyles({
        "chats":{
            height:400,//やり取り全体のボックスの高さがheight: 592px、下の選択肢部分がheight: 192pxなので、残りは400pxだから400にしている
            padding:'0',
            overflow:'auto'//height:400を超えたときスクロールバーを出す
        }
    })
));

const Chats = (props) => {
    //マテリアルUI
    const classes = useStyles();

    return (
        //マテリアルUIのList
        <List className={classes.chats} id={"scroll-area"}>{/*componentDidUpdateに領域を渡し、document.getElementById('scroll-area')で認識させるためidを振っている */}
            {props.chats.map((chat, index) =>{//chatはvalue。App.jsxで実行されたinitChatsのchatが渡されている
                return <Chat text={chat.text} type={chat.type} key={index.toString()} />//chat.jsxに上で書いたvalueの中身のtextとtypeを渡している。key={index.toString()は取り出したvalueを0から番号を振っているためtoString()で数字を文字列に変換している
        })}
        </List>
    )
}

export default Chats;