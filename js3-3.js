'use strict'
//ボタン要素取得
const addBtn = document.getElementById('addBtn');

//ラジオボタン取得
const radioAllBtn = document.getElementById('all');
const radioWorkingBtn = document.getElementById('working');
const radioDoneBtn = document.getElementById('done');


//テーブル要素取得
const doList = document.getElementById('doList');

//配列。後に追加される
const lists = []; //({task:inputValue,status:'作業中'})
//入力内容取得
const input = document.getElementById('input');
//id用
let idIndex = 0;
//ボタン生成
const makeWorkBtn = (status, tr,tdId,testId) => {//状態　作業中
    //const target = document.getElementById(id);
    const workBtn = document.createElement('button');
    const workContent = document.createTextNode(status);
    workBtn.appendChild(workContent);
    workBtn.addEventListener('click', () => {
        if (workBtn.innerHTML === '作業中') {
            lists[testId].status = '完了'
            filterShow();
            return;
        }
        if (workBtn.innerHTML === '完了') {
            console.log(tr.rowIndex);
            console.log(tdId);
            lists[testId].status = '作業中'
            filterShow();
            return;
        }

    })
    return workBtn;
}

const makeDelBtn = (testId) => {//状態　消去
    const deleteBtn = document.createElement('button');
    const workContent = document.createTextNode('消去');
    deleteBtn.appendChild(workContent);
    deleteBtn.addEventListener('click', () => {

        lists.splice(testId, 1);    
      
        doList.innerHTML = '';
        for (var i = idIndex; i < lists.length; i++) {
            lists[i].id = i
          }
        filterShow()
    });
    return deleteBtn;
}

//ToDoリスト作成
const toDoShow = (a) => {
    doList.innerText = '';

    a.forEach((value, id) => {
        const tr = document.createElement('tr');
        tr.setAttribute('id',id);
        const status = value.status;
        //<th>ID
        const tdId = document.createElement('td');
        tdId.textContent = value.id;//ID
        let testId= value.id;
        //<th>コメント
        const tdComment = document.createElement('td');
        tdComment.textContent = value.task;//コメント

        tr.appendChild(tdId);
        tr.appendChild(tdComment);
        tr.appendChild(makeWorkBtn(status, tr,tdId,testId));
        tr.appendChild(makeDelBtn(tr, tdId,testId));
        doList.appendChild(tr);
    });
}


//実行
addBtn.addEventListener('click', () => {
    const inputValue = input.value;
    const list = ({  id: idIndex,task: inputValue, status: '作業中' });
    lists.push(list);
    if (radioAllBtn.checked || radioWorkingBtn.checked) {
        toDoShow(lists);
    }
    input.value = ''//入力後、前の入力内容を消す
    idIndex ++;
});

//作業中ボタン
radioWorkingBtn.addEventListener('click', () => {
    if (radioWorkingBtn.checked) {
        filterShow();

    }
})
//完了ボタン
radioDoneBtn.addEventListener('click', () => {
    if (radioDoneBtn.checked) {
        filterShow();
    }
})

const filterShow = () => {
    if (radioAllBtn.checked) {
        return toDoShow(lists);

    }
    if (radioWorkingBtn.checked) {
        const listsWorking = lists.filter((value,) => {
            return (value.status === '作業中');

        })
        return toDoShow(listsWorking);
    }
    if (radioDoneBtn.checked) {
        const listsDone = lists.filter((value) => {
            return value.status === '完了';
        })
        return toDoShow(listsDone);
    }
}


radioAllBtn.addEventListener('click', () => {
    toDoShow(lists);
});
