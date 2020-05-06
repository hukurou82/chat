import React from 'react';
//import defaultDataset from './dataset';jsonではなくローカルに持っていた時にimportしていた
import './assets/styles/styles.css';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",//デフォルトはinitにしている
      dataset: {},//dataset内のdefaultDatasetを当てる(firebaseにつないだ場合firebaseから取ってくるのでオブジェクトで空にしておく)
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)//クラス内で関数が実行されるとrenderが実行されてしまう。renderが走るたびにselect={this.selectAnswer}のコールバック関数が毎回生成されてしまう為bind関数を使う。bind関数を使うと同じ関数をつかうことが出来る
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  //選ばれたcurrentId
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats//現在のchatsを受け取る
    chats.push({
      text: this.state.dataset[nextQuestionId].question,//現在選択されたnextQuestionIdのquestionがtextに入る
      type: 'question'
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,//現在選択されたnextQuestionIdのanswersがanswersに入る
      chats: chats,//chatsをchatsにsetStateする（更新）
      currentId: 'nextQuestionId'//currentIdはnextQuestionIdとなる
    })
  }

  //answerの配列を作る関数
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    {/**componentDidMountからselectedAnswerとnextQuestionIdが渡されてくる */ }
    switch (true) {
      case (nextQuestionId === 'init')://initだった場合
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)//initをdisplayNextQuestionに入れてdisplayNextQuestionが実行される
        break;

      case (nextQuestionId === 'contact'):
        this.handleClickOpen();//nextQuestionIdがcontactの場合、handleClickOpen関数が実行され、open内がtrueになりFormDialogにtrueが渡されフォームが開く
        break;

      case (/^https:*/.test(nextQuestionId))://javascriptのtextメソッドを使う。https～から始まるものをURLとして認識してそれを実行する(スラッシュで囲んだ中が正規表現)
        const a = document.createElement('a');//<a>タグを作る要素
        a.href = nextQuestionId;//<a>nextQuestionId</a>という形にする
        a.target = '_blank';//<a></a>を別タブで開く
        a.click();//クリックされたら実行
        break;

      default://nextQuestionId === 'init'以外の時の処理
        const chats = this.state.chats;//更新用。現在のthis.state.chatsをchatsに入れる
        chats.push({//chatsに上で取ってきたchatをプッシュする
          text: selectedAnswer,
          type: 'answer'
        })

        this.setState({
          chats: chats//chatsをchatsにsetStateする（更新）
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000)//回答が選択されて回答が上のchats: chatsで更新されたらdisplayNextQuestionが実行されnextQuestionIdが渡される
        break;    //setTimeoutで1000（1秒）関数の実行をディレイしている
    }
  }

  //初期値のopenの判定を持っておく関数
  handleClickOpen = () => {
    this.setState({ open: true })//handleClickOpenが実行されるとsetStateでopenがtrueに更新される
  };
  //初期値のopenの判定を持っておく関数
  handleClose = () => {
    this.setState({ open: false })//handleCloseが実行されるとsetStateでopenがfalseに更新される
  };

  initDataset = (dataset) => {
    this.setState({dataset: dataset})
  }

  componentDidMount() {//componentDidMountはrenderが最初に走ってから実行される。
    (async() => {
      const dataset = this.state.dataset

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          dataset[id] = data
        })
      })

      this.initDataset(dataset)
      const initAnswer = "";//initAnswerを空にしておく
      this.selectAnswer(initAnswer, this.state.currentId)//selectAnswerに空が, nextQuestionIdに現在のcurrentIdが渡される（最初ならinit）
    })()
  }

  //スクロール位置の頂点をスクロール領域の最下部に設定
  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {//スクロールエリアが存在している場合
      scrollArea.scrollTop = scrollArea.scrollHeight//スクロールエリアの頂点を、スクロールエリアのハイトに合わせる
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />{/*Chats.jsxにChatsを渡す。Chatsの中身はconstructorのthis.stateのChatsの中身 */}
          <AnswersList
            answers={this.state.answers}/*AnswersList.jsxにanswersを渡す。answersの中身はdatasetのconstructorのthis.stateのanswersの中身*/
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />{/*openがtrue、falseかをFormDialogに渡している */}
        </div>
      </section>
    );
  }
}