//Getting todays date and creating a value 
var today = new Date(), dd = today.getDate(), mm = today.getMonth() + 1, yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = yyyy + '-' + mm + '-' + dd;

//Initializing Values
const store = new Store();
const ui = new UI();
data = store.getExercise(today);
ui.headerDate(today);
let currentId = 0;

//First loading.
document.addEventListener('DOMContentLoaded', store.displayExercise(today));
ui.hideEditBtn();

//Add button
document.querySelector('.add-btn').addEventListener('click',
    function (e) {
        //Get Form Values
        const exercise = ui.returnCurrentValue()[0], reps = ui.returnCurrentValue()[1], sets = ui.returnCurrentValue()[2];


        if (exercise === '' || reps === '' || sets === '') {
            window.alert('Please fill in all the fields');
        } else {
            const newItem = addItem(exercise, reps, sets, data)
            data.push(newItem);
            ui.addToTable(newItem);
            store.addExercise(newItem, today);
            e.preventDefault();
        }
    });

//
document.getElementById('item-list').addEventListener('click', (e) => {
    if (e.target.className === 'fa fa-trash') {
        ui.deleteFromTable(e.target);
        store.removeExercise(e.target, today)
    } else {
        const indexOfitem = ui.returnIndex(e.target);
        data.forEach((each) => {
            if (each.ID.toString() === indexOfitem) {
                // console.log(each);
                currentId = each.ID;
                ui.displayItemToEdit(each);

            }
        });
    }
});

document.querySelector('.update-btn').addEventListener('click', () => {
    const exercise = ui.returnCurrentValue()[0], reps = ui.returnCurrentValue()[1], sets = ui.returnCurrentValue()[2];


    if (exercise === '' || reps === '' || sets === '') {
        window.alert('Please fill in all the fields');
    } else {
        let temp;
        data.forEach((each) => {
            if (each.ID === currentId) {
                each.name = exercise;
                each.reps = reps;
                each.sets = sets;
                temp = each;
            }
        });
        store.updateItem(temp, today);
        // ui.reloadUI(data);
        ui.updateItem(temp);
    }

});

document.querySelector('.back-btn').addEventListener('click', () => {
    ui.clearEntryFields();
    ui.hideEditBtn();
});

document.getElementById('calender').addEventListener('click', () => {
    today = document.querySelector('.dateField').value;
    data = store.getExercise(today);
    ui.reloadUI(data);
    ui.headerDate(today);
});

document.querySelector('.clear-btn').addEventListener('click', () => {
    data = [];
    ui.reloadUI(data);
    store.removeAll(today);
});

function addItem(name, reps, sets, data) {
    let ID;
    if (data.length > 0) {
        ID = data[data.length - 1].ID + 1;
    } else {
        ID = 0;
    }
    const test = new Exercise(name, reps, sets, ID);
    return test;
}
