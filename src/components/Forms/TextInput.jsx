import React from 'react';
import TextField from '@material-ui/core/TextField';

//マテリアルUIのText Fieldを使用
const TextInput = (props) => {
    return (
        <TextField
            fullWidth={true}//画面いっぱいに入力欄を求める
            label={props.label}//サンプル入力例
            margin={"dense"}
            multiline={props.multiline}//複数行の場合trueにする
            rows={props.rows}//行数
            value={props.value}//textフィールドが持っている値（情報）
            type={props.type}//htmlと同じようにtextなのかpasswordなのかを判断できるやつ
            onChange={props.onChange}//入力されたものを入力されたそばから格納していく
        />
    )
}

export default TextInput;