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
//

//ボタン生成
const makeWorkBtn = (status, tr) => {//状態　作業中
    const workBtn = document.createElement('button');
    const workContent = document.createTextNode(status);
    workBtn.appendChild(workContent);
    workBtn.addEventListener('click', () => {
        if (workBtn.innerHTML === '作業中') {
            const index = tr.rowIndex - 1;
            lists[index].status = '完了'
            filterShow();
            return;
        }
        if (workBtn.innerHTML === '完了') {
            const index = tr.rowIndex - 1;
            lists[index].status = '作業中'
            filterShow();


        }

    })
    return workBtn;
}

const makeDelBtn = (tr, id) => {//状態　消去
    const deleteBtn = document.createElement('button');
    const workContent = document.createTextNode('消去');
    deleteBtn.appendChild(workContent);
    deleteBtn.addEventListener('click', () => {
        // const targetIndex = lists.findIndex(list => {
        //     return list.id === id;
        // });
        const index = tr.rowIndex - 1;
        lists.splice(index, 1);
        lists.forEach((value, index) => {
            lists[index].id = index;
        });

        //lists.splice(index, 1);
        filterShow()
    });
    return deleteBtn;
}

//ToDoリスト作成
const toDoShow = (a) => {
    doList.innerText = '';

    a.forEach((list, id) => {
        const tr = document.createElement('tr');
        const status = list.status;
        //<th>ID
        const tdId = document.createElement('td');
        tdId.textContent = list.id;//ID
        //<th>コメント
        const tdComment = document.createElement('td');
        tdComment.textContent = list.task;//コメント

        tr.appendChild(tdId);
        tr.appendChild(tdComment);
        tr.appendChild(makeWorkBtn(status, tr));
        tr.appendChild(makeDelBtn(tr, id));
        doList.appendChild(tr);
    });
}


//実行
addBtn.addEventListener('click', () => {
    const inputValue = input.value;
    const list = ({ id: lists.length, task: inputValue, status: '作業中' });
    lists.push(list);
    if (radioAllBtn.checked || radioWorkingBtn.checked) {
        toDoShow(lists);
    }
    input.value = ''//入力後、前の入力内容を消す

});

//作業中ボタン
radioWorkingBtn.addEventListener('click', () => {
    if (radioWorkingBtn.checked) {
        const listsWorking = lists.filter((value) => {
            return value.status === '作業中';
        })

        doList.innerText = '';
        listsWorking.forEach((job, index) => {
            const tr = document.createElement('tr');
            const status = job.status;
            //<th>ID
            const tdId = document.createElement('td');
            tdId.textContent = job.id;//ID
            //<th>コメント
            const tdComment = document.createElement('td');
            tdComment.textContent = job.task;//コメント

            tr.appendChild(tdId);
            tr.appendChild(tdComment);
            tr.appendChild(makeWorkBtn(status, tr));
            tr.appendChild(makeDelBtn(tr));
            doList.appendChild(tr);
        });
    }
})
//完了ボタン
radioDoneBtn.addEventListener('click', () => {
    if (radioDoneBtn.checked) {
        const listsDone = lists.filter((value) => {
            return value.status === '完了';
        })

        doList.innerText = '';
        listsDone.forEach((job, index) => {
            const tr = document.createElement('tr');
            const status = job.status;
            //<th>ID
            const tdId = document.createElement('td');
            tdId.textContent = job.id;//ID
            //<th>コメント
            const tdComment = document.createElement('td');
            tdComment.textContent = job.task;//コメント

            tr.appendChild(tdId);
            tr.appendChild(tdComment);
            tr.appendChild(makeWorkBtn(status, tr));
            tr.appendChild(makeDelBtn(tr));
            doList.appendChild(tr);
        });
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



