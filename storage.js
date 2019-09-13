class Store {
    getExercise(today) {
        let list;
        if (localStorage.getItem(today) === null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem(today));
        }
        return list;
    }

    displayExercise(today) {
        const list = this.getExercise(today);

        list.forEach(function (book) {
            const iu = new UI;
            iu.addToTable(book);
        });
    }
    addExercise(book, today) {
        const list = this.getExercise(today);
        list.push(book);
        let temp = JSON.stringify(list).slice(1, JSON.stringify(list).length - 1);
        temp = temp.replace(/\\/g, "");

        localStorage.setItem(today, temp);
    }
    removeExercise(exercise, today) {
        const list = this.getExercise(today);
        list.forEach(function (book, index) {
            if (exercise.parentElement.parentElement.id === book.ID.toString()) {
                list.splice(index, 1);
            }
        });

        let temp = JSON.stringify(list).slice(1, JSON.stringify(list).length - 1);
        temp = temp.replace(/\\/g, "");
        localStorage.setItem(today, temp);
    }
    updateItem(exercise, today) {
        const list = this.getExercise(today);

        list.forEach(function (book) {
            if (book.ID === exercise.ID) {
                book.name = exercise.name;
                book.reps = exercise.reps;
                book.sets = exercise.sets;
            }
        });
        let temp = JSON.stringify(list).slice(1, JSON.stringify(list).length - 1);
        temp = temp.replace(/\\/g, "");

        localStorage.setItem(today, temp);
    }
    removeAll(today) {
        localStorage.removeItem(today);
    }

}
