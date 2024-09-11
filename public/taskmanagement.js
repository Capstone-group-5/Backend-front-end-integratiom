document.addEventListener('alpine:init', () => {
    Alpine.data('taskManagement', () => ({
        task: '',
        assigner: '',
        assignee: '',
        status: '',
        cOrg: '',
        taskList: [],

        // Add a new task
        async addTask() {
            if (this.task.trim() === '' || this.assigner.trim() === '' || this.assignee.trim() === '' || this.status.trim() === '') {
                alert('Please fill out all fields.');
                return;
            }

            try {
                const response = await axios.post(`http://localhost:5565/tasks/add_new_task/${this.cOrg}`, {
                    task: this.task,
                    assigner: this.assigner,
                    assignee: this.assignee,
                    status: this.status
                });

                if (response.status === 200) {
                    alert('Task added successfully');
                    this.taskList.push({
                        task: this.task,
                        assigner: this.assigner,
                        assignee: this.assignee,
                        status: this.status
                    });
                    this.clearFields(); // Clear input fields
                } else {
                    alert('Failed to add task');
                }
            } catch (err) {
                console.error('Error adding task:', err.message);
                alert('An error occurred while adding the task.');
            }
        },

        // Fetch all tasks
        async fetchTasks() {
            try {
                const response = await axios.get(`http://localhost:5565/tasks/get_all_tasks`);

                if (response.status === 200) {
                    this.taskList = response.data;
                } else {
                    alert('Failed to fetch tasks');
                }
            } catch (err) {
                console.error('Error fetching tasks:', err.message);
                alert('An error occurred while fetching the tasks.');
            }
        },

        // Update an existing task
        async updateTask(index) {
            const updatedTask = this.taskList[index];

            try {
                const response = await axios.put(`http://localhost:5565/tasks/update_task/${updatedTask.id}`, {
                    task: updatedTask.task,
                    assigner: updatedTask.assigner,
                    assignee: updatedTask.assignee,
                    status: updatedTask.status
                });

                if (response.status === 200) {
                    alert('Task updated successfully');
                } else {
                    alert('Failed to update task');
                }
            } catch (err) {
                console.error('Error updating task:', err.message);
                alert('An error occurred while updating the task.');
            }
        },

        // Delete a task
        async deleteTask(index) {
            const taskToDelete = this.taskList[index];

            try {
                const response = await axios.delete(`http://localhost:5565/tasks/delete_task/${taskToDelete.id}`);

                if (response.status === 200) {
                    alert('Task deleted successfully');
                    this.taskList.splice(index, 1);
                } else {
                    alert('Failed to delete task');
                }
            } catch (err) {
                console.error('Error deleting task:', err.message);
                alert('An error occurred while deleting the task.');
            }
        },

        // Clear input fields
        clearFields() {
            this.task = '';
            this.assigner = '';
            this.assignee = '';
            this.status = '';
        }
    }));
});
