import React from 'react'
import {Answer} from './index'//エントリポイント内からインポートしている

const AnswersList = (props) => {
    return(
        <div className="c-grid__answer">
            {props.answers.map((value, index) => {//App.jsxから渡されたanswersをmapメソッドを使って配列内のvalueとindexを取る。この場合「{content: "仕事を依頼したい", nextId: "job_offer"},」が一つのvalue。
                return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select}/>//Answer.jsxに上で書いたvalueの中身のcontentを渡している。key={index.toString()は取り出したvalueを0から番号を振っているためtoString()で数字を文字列に変換している
            })}
        </div>
    )
}

export default AnswersList;