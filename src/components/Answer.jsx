import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => (//マテリアルUIを使う記述
    createStyles({//jsonスタイルで記述
        "button": {//buttonのスタイル
            borderColor: '#FFB549',
            color: '#FFB549',
            fontWeight: 600,
            marginBottom: '8px',
            "&:hover": {//カーソルが当たった場合
                backgroundColor: '#FFB549',
                color: '#fff'
            }
        }
    })
));

const Answer = (props) => {
    const classes = useStyles();//const useStylesに入れたものをconst classesに入れる
    return (
        <Button className={classes.button}//const classesに入れたbuttonをcssとして当てている
            variant="outlined"
            onClick={() => props.select(props.content, props.nextId)}
        >
            {props.content}
        </Button>
    )
}

export default Answer;