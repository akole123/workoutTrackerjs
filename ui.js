class UI {
    constructor() {
        this.table = document.getElementById('item-list');
        this.exerciseName = document.getElementById('exercise-name');
        this.reps = document.getElementById('rep-number');
        this.sets = document.getElementById('set-number');
        this.editBtn = document.querySelector('.update-btn');
        this.addBtn = document.querySelector('.add-btn');
        this.backBtn = document.querySelector('.back-btn');
        this.header = document.getElementById('headerValue');
    }
    reloadUI(data) {
        const tableTemp = document.getElementById('item-list');
        tableTemp.innerHTML = '';

        data.forEach(function (each) {
            tableTemp.innerHTML += `<li class="collection-item" id="${each.ID}">
            <Strong>${each.name}: </Strong><em>${each.sets} sets for ${each.reps} reps</em>
            <a style="padding-left:25px;" href="#" class="secondary-content"><i class="fa fa-trash" aria-hidden="true" ></i></a>
            <a href="#" class="secondary-content"><i class="N fa fa-pencil"></i></a>
            </li>`;
        });

    }
    addToTable(exercise) {
        this.table.innerHTML += `<li class="collection-item" id="${exercise.ID}">
        <Strong>${exercise.name}: </Strong><em>${exercise.sets} sets for ${exercise.reps} reps</em>
        <a style="padding-left:25px;" href="#" class="secondary-content"><i class="fa fa-trash" aria-hidden="true" ></i></a>
        <a href="#" class="secondary-content"><i class="N fa fa-pencil"></i></a>
        </li>`;
        this.clearEntryFields();
    }
    deleteFromTable(e) {
        e.parentElement.parentElement.remove();
    }
    clearEntryFields() {
        this.exerciseName.value = '';
        this.reps.value = '';
        this.sets.value = '';
    }
    returnCurrentValue() {
        return [this.exerciseName.value, this.reps.value, this.sets.value];
    }
    returnIndex(e) {
        if (e.className === 'N fa fa-pencil') {
            // console.log('pressed')
            return e.parentElement.parentElement.id;
        }
    }
    displayItemToEdit(item) {
        this.exerciseName.value = `${item.name}`;
        this.reps.value = `${item.reps}`;
        this.sets.value = `${item.sets}`;
        this.editBtn.style.display = 'inline'
        this.backBtn.style.display = 'inline'
        this.addBtn.style.display = 'none';
    }
    hideEditBtn() {
        this.editBtn.style.display = 'none';
        this.backBtn.style.display = 'none';
        this.addBtn.style.display = 'inline';
        this.clearEntryFields();

    }
    updateItem(item) {
        document.ElementById(item.ID.toString()).innerHTML = `<Strong>${item.name}: </Strong><em>${item.sets} sets for ${item.reps} reps each</em>
        <a style="padding-left:25px;" href="#" class="secondary-content"><i class="fa fa-trash" aria-hidden="true" ></i></a>
        <a href="#" class="secondary-content"><i class="N fa fa-pencil"></i></a>
        </li>`;
        this.hideEditBtn();
        this.clearEntryFields();
    }
    headerDate(date) {
        this.header.textContent = `Date: ${date}`;
    }
}