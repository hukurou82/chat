import React from 'react'
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            description: ""
        }

        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)
    }

    inputName = (event) => {
        this.setState({ name: event.target.value })//入力されたものをテキスト欄にセットしていく（event.target）。.valueは入力された名前はvalueになるという意味
    }
    inputEmail = (event) => {
        this.setState({ email: event.target.value })//入力されたものをテキスト欄にセットしていく（event.target）。.valueは入力されたメールアドレスはvalueになるという意味
    }
    inputDescription = (event) => {
        this.setState({ description: event.target.value })//入力されたものをテキスト欄にセットしていく（event.target）。.valueは入力されたお問い合わせ内容はvalueになるという意味
    }

    //送信するボタンを押されたら実行する関数。slackに通知が来る
    submitForm = () => {
        const name = this.state.name//テキスト欄に入れた名前を格納
        const email = this.state.email//テキスト欄に入れたメールアドレスを格納
        const description = this.state.description//テキスト欄に入れたお問い合わせ内容を格納

        //slackに通知を送る設定。Incoming Webhookインテグレーション
        const payload = {//送るデータはpayloadと呼ばれることが多い
            text:'お問い合わせがありました\n' +
                 'お名前:' + name + '\n' + 
                 'Email:' + email + '\n' +
                 'お問い合わせ内容:\n' + description
        }

        const url = 'https://hooks.slack.com～～'

        fetch(url,{//javascriptならfetchメソッドでAPIを叩きに行くことが一般的
            method: 'POST',
            body: JSON.stringify(payload)//JSON.stringifyメソッドはjson形式に変換するメソッド。payload内のものをjson形式にしたものをbodyに入れている
        }).then(() => {
            alert('送信が完了しました。追ってご連絡いたします。')
            this.setState({//送信が完了したら中身を空に
                name:"",
                email:"",
                description:""
            })
            return this.props.handleClose();//キャンセルを押した処理と同じことをしている
        })
    }


    //const[open, setOpen] = React.useState(false);関数コンポーネントの書き方

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    render() {
        return (//マテリアルUIのDialogを使う
            <Dialog
                open={this.props.open}//App.jsxからprops.openの中身を受け取っている
                onClose={this.props.handleClose}//App.jsxからprops.handleCloseの中身を受け取っている
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextInput
                            label={"お名前（必須）"}
                            multiline={false}
                            rows={1}
                            value={this.state.name}//event.targetで管理された
                            type={"text"}
                            onChange={this.inputName}//inputNameに入力されたものを入力されたそばから更新していく
                        />
                        <TextInput
                            label={"メールアドレス（必須）"}
                            multiline={false}
                            rows={1}
                            value={this.state.email}//event.targetで入力されたものをどんどんJavascriptで管理し格納する。event.currentTargetと似てる？
                            type={"text"}
                            onChange={this.inputEmail}//inputEmailに入力されたものを入力されたそばから更新していく
                        />
                        <TextInput
                            label={"お問い合わせ内容"}
                            multiline={true}
                            rows={5}
                            value={this.state.description}//event.targetで入力されたものをどんどんJavascriptで管理し格納する。event.currentTargetと似てる？
                            type={"text"}
                            onChange={this.inputDescription}//inputDescriptionに入力されたものを入力されたそばから更新していく
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={this.submitForm} color="primary" autoFocus>{/**送信するを押されたらsubmitForm関数を実行 */}
                        送信する
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}